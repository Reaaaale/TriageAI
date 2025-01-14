const express = require('express');
const db = require('../database');
const Prediction = require('../models/predictionModel');

const router = express.Router();

// Rotta per salvare i dati nel database
router.post('/', async (req, res) => {
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
    if (!frequenza_cardiaca || !codiceColoreAssegnato || !motivo) {
        return res.status(400).send('Dati mancanti');
    }

    try {
        // Usa il modello per salvare i dati
        await Prediction.save({
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
        });

        res.send('Dati salvati con successo');
    } catch (error) {
        console.error('Errore nel salvataggio dei dati:', error);
        res.status(500).send('Errore nel salvataggio dei dati');
    }
});

module.exports = router;
