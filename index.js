const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const mysql = require('mysql2');

// Configurazione del database MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Juventus.34',
    database: 'triage_ml',
}).promise();

// Test di connessione al database
db.execute('SELECT 1')
    .then(() => console.log("Connessione al database riuscita"))
    .catch(err => console.error("Errore nella connessione al database:", err));

// Creazione dell'app Express
const app = express();
app.use(bodyParser.json()); // Parsing JSON
app.use(cors());
app.use(express.static(path.join(__dirname))); // Servire file statici come summary.html

// Rotta per la pagina principale
app.get('/', (req, res) => {
    console.log("Rotta principale chiamata.");
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rotta per calcolare la predizione
app.post("/predict", (req, res) => {
    console.log("Rotta /predict chiamata. Dati ricevuti:", req.body);
    const {
        frequenza_cardiaca,
        pressione_sistolica,
        pressione_diastolica,
        frequenza_respiratoria,
        temperatura,
        saturazione_ossigeno,
        dolore,
        stato_coscienza
    } = req.body;

    // Costruzione del comando Python
    const command = `py inferenza.py ${frequenza_cardiaca} ${pressione_sistolica} ${pressione_diastolica} ${frequenza_respiratoria} ${temperatura} ${saturazione_ossigeno} ${dolore} ${stato_coscienza}`;
    console.log("Eseguendo comando Python:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("Errore exec:", error.message);
            return res.status(500).send("Errore nell'inferenza del modello");
        }
        if (stderr) {
            console.error("Errore nello script Python:", stderr);
            return res.status(500).send("Errore nello script Python");
        }

        const prediction = stdout.trim();
        console.log("Predizione generata:", prediction);
        res.json({ prediction });
    });
});

// Rotta per salvare i dati nel database
app.post("/save", async (req, res) => {
    console.log("Rotta /save chiamata. Dati ricevuti:", req.body);

    const {
        frequenza_cardiaca,
        pressione_sistolica,
        pressione_diastolica,
        frequenza_respiratoria,
        temperatura,
        saturazione_ossigeno,
        dolore,
        stato_coscienza,
        predizione_algoritmo,
        codiceColoreAssegnato,
        motivo
    } = req.body;

    // Validazione dei dati
    if (!frequenza_cardiaca || !predizione_algoritmo || !codiceColoreAssegnato || !motivo) {
        console.error("Dati mancanti:", req.body);
        return res.status(400).send("Dati mancanti");
    }

    // Query SQL
    const query = `
        INSERT INTO prediction (
            frequenza_cardiaca, pressione_sistolica, pressione_diastolica,
            frequenza_respiratoria, temperatura, saturazione_ossigeno,
            dolore, stato_coscienza, predizione_algoritmo, codice_colore_assegnato, motivo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        frequenza_cardiaca, pressione_sistolica, pressione_diastolica,
        frequenza_respiratoria, temperatura, saturazione_ossigeno,
        dolore, stato_coscienza, predizione_algoritmo, codiceColoreAssegnato, motivo
    ];

    console.log("Query SQL pronta:", query);
    console.log("Parametri:", params);

    try {
        const [result] = await db.execute(query, params);
        console.log("Dati inseriti correttamente nel database:", result);
        res.send("Dati salvati con successo");
    } catch (error) {
        console.error("Errore durante l'inserimento nel database:", error);
        res.status(500).send("Errore nel salvataggio dei dati");
    }
});

// Chiudere il pool MySQL in modo sicuro
process.on('SIGINT', async () => {
    console.log("Chiusura del server...");
    try {
        await db.end();
        console.log("Pool MySQL chiuso correttamente.");
    } catch (err) {
        console.error("Errore durante la chiusura del pool MySQL:", err);
    }
    process.exit(0);
});

// Avvio del server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
