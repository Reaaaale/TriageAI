const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const router = express.Router();

// Rotta per effettuare la predizione
router.post('/', (req, res) => {
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

    const scriptPath = path.join(__dirname, "../python/inferenza.py");
    const command = `py "${scriptPath}" ${frequenza_cardiaca} ${pressione_sistolica} ${pressione_diastolica} ${frequenza_respiratoria} ${temperatura} ${saturazione_ossigeno} ${dolore} ${stato_coscienza}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Errore durante l'esecuzione: ${error.message}`);
            return res.status(500).send('Errore nell\'inferenza del modello');
        }

        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('Errore nello script Python');
        }

        const prediction = stdout.trim();
        res.json({ prediction });
    });
});

module.exports = router;
