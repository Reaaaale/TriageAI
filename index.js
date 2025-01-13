const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path'); // Importa il modulo 'path'


const app = express();

app.use(bodyParser.json());  //Permette di leggere i dati in formato JSON
app.use(cors());

// Servire il file HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/predict", (req, res) => {
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

const command = `py inferenza.py ${frequenza_cardiaca} ${pressione_sistolica} ${pressione_diastolica} ${frequenza_respiratoria} ${temperatura} ${saturazione_ossigeno} ${dolore} ${stato_coscienza}`;

exec (command, (error, stdout ,stderr) => {
  if (error) {
    console.error(`exec error: ${error.message}`);
  
    return res.status(500).send("Errore nell'inferenza del modello");
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return res.status(500).send("Errore nello script Python.");
}

const prediction = stdout.trim();
res.json({ prediction });

});
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

