const db = require('../database');

const Prediction = {
    save: async (data) => {
        const query = `
            INSERT INTO prediction (
                frequenza_cardiaca, pressione_sistolica, pressione_diastolica,
                frequenza_respiratoria, temperatura, saturazione_ossigeno,
                dolore, stato_coscienza, predizione_algoritmo,
                codice_colore_assegnato, motivo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            data.frequenza_cardiaca,
            data.pressione_sistolica,
            data.pressione_diastolica,
            data.frequenza_respiratoria,
            data.temperatura,
            data.saturazione_ossigeno,
            data.dolore,
            data.stato_coscienza,
            data.predizione_algoritmo,
            data.codiceColoreAssegnato,
            data.motivo
        ];

        return db.execute(query, params);
    }
};

module.exports = Prediction;
