const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importa la configurazione del database
const db = require('./database');

// Importa le rotte
const predictRoutes = require('./routes/predict');
const saveRoutes = require('./routes/save');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public'))); // Serve i file statici

// Rotte
app.use('/predict', predictRoutes);
app.use('/save', saveRoutes);

// Test del database
db.execute('SELECT 1')
    .then(() => console.log('Connessione al database riuscita'))
    .catch(err => console.error('Errore nella connessione al database:', err));

// Avvio del server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
