# Sistema di Triage ML

Un'applicazione per la predizione automatica del codice colore basata su parametri vitali. Include un'interfaccia utente semplice e un backend che gestisce i dati e la predizione tramite modelli di machine learning.

---

## Funzionalità

- **Predizione Codice Colore**: Stima automatica del codice colore basata su parametri vitali.
- **Gestione Dati**: Salvataggio dei dati predetti in un database MySQL.
- **Interfaccia Intuitiva**: Pagina principale per l'inserimento dei dati e riepilogo con conferma di salvataggio.

---

## Struttura del Progetto

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

---

## Installazione

### **Requisiti**
- **Node.js** (versione 14 o successiva)
- **MySQL** (con un database configurato)
- **Python** (versione 3.8 o successiva con PyTorch)

---

### **1. Clona il repository**
```bash
git clone https://github.com/tuo-nome-utente/sistema-triage-ml.git
cd sistema-triage-ml
```

### **2. Installa le dipendenze Node.js**
```bash
npm install
```

### **3. Configura il database**
- Assicurati che MySQL sia in esecuzione.
- Crea un database chiamato `triage_ml`.
- Esegui lo script per creare la tabella `prediction`:
```sql
CREATE TABLE prediction (
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
);
```
- Aggiorna il file `src/database.js` con le credenziali del tuo database.

### **4. Avvia il server**
```bash
node src/index.js
```

### **5. Apri il browser**
Vai su `http://localhost:3000` per utilizzare l'app.

---

## Utilizzo

1. Compila i campi richiesti nella pagina principale.
2. Clicca su **Calcola Predizione** per ottenere il codice colore predetto.
3. Conferma il salvataggio dei dati nel database.

---

## Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.
