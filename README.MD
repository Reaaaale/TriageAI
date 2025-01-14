# Color Code Prediction

## Descrizione
Questa è una versione di prova del progetto **Color Code Prediction**, un'applicazione che utilizza un modello di machine learning per predire il codice colore di triage in base a parametri vitali forniti dall'utente.

## Funzionalità principali
1. **Interfaccia utente:** Consente agli utenti di inserire i parametri vitali tramite un'interfaccia intuitiva.
2. **Predizione automatica:** Calcola e mostra il codice colore di triage basato sui dati forniti.
3. **Salvataggio dei dati:** Permette di salvare i dati in un database per un'analisi futura.

## Struttura del progetto
```
.
├── models/                   # Modelli per il database e machine learning
│   ├── predictionModel.js    # Modello per la tabella `prediction`
│   ├── best_model.pth        # File del modello ML
│   ├── scaler.pkl            # Scaler per il pre-processing
├── public/                   # File statici (frontend)
│   ├── scripts/              # File JavaScript
│   │   ├── main.js           # Script per la pagina principale
│   │   ├── summary.js        # Script per la pagina di riepilogo
│   ├── styles/               # File CSS
│   │   ├── styles.css        # Stile personalizzato
│   ├── index.html            # Pagina principale
│   ├── summary.html          # Pagina riepilogo
├── src/                      # File sorgente lato server
│   ├── database.js           # Configurazione database
│   ├── routes/               # Rotte del backend
│   │   ├── predict.js        # Rotte per la predizione
│   │   ├── save.js           # Rotte per il salvataggio
│   ├── index.js              # File principale del server
├── .gitignore                # File per escludere file dal tracking Git
├── package.json              # Dipendenze Node.js
├── README.md                 # Documentazione
```

## Prossimi sviluppi
- La **Versione 2** includerà un database online per il riaddestramento continuo del modello di machine learning.

## Istruzioni per l'installazione
### Requisiti
- **Node.js** (versione 14 o successiva)
- **MySQL** (con un database configurato)
- **Python** (versione 3.8 o successiva con PyTorch)

### Passaggi
1. Clona il repository:
   ```bash
   git clone https://github.com/tuo_username/color-code-prediction.git
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Configura il file `.env` con le credenziali del database:
   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tuapassword
   DB_NAME=triage_ml
   DB_PORT=3306
   ```
4. Il DB deve avere la seguente struttura:
id INT AUTO_INCREMENT PRIMARY KEY,
frequenza_cardiaca INT,
pressione_sistolica INT,
pressione_diastolica INT,
frequenza_respiratoria INT,
temperatura FLOAT,
saturazione_ossigeno FLOAT,
dolore INT,
stato_coscienza INT,
predizione_algoritmo VARCHAR(20),
codice_colore_assegnato VARCHAR(20),
motivo TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

5. Avvia il server:
   ```bash
   node src/index.js
   ```
6. Accedi all'applicazione tramite il browser:
   ```plaintext
   http://localhost:3000
   ```

## Utilizzo
1. Compila i campi richiesti nella pagina principale.
2. Clicca su **Calcola Predizione** per ottenere il codice colore predetto.
3. Conferma il salvataggio dei dati nel database.

## Licenza
Questo progetto è distribuito sotto la licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.
