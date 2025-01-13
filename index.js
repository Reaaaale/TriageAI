const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());  //Permette di leggere i dati in formato JSON
app.use(cors());  //Permette le richieste da domini diversi

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post("/predict", (req, res) => {
  const {
    frequenza_cardiaca,
    frequenza_respiratoria,
    temperatura,
    saturazione_ossigeno,
    dolore,
    stato_coscienza,
    pressione_sistolica,
    pressione_diastolica
} = req.body;

console.log("Dati ricevuti",req.body);

const prediction = "Mettere l'inferenza in pyhton";

res.json({ prediction });

});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

