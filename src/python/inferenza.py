import sys
import torch
import joblib
import numpy as np
import pandas as pd
import torch.nn as nn

# Definizione del modello
class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size1, hidden_size2, output_size):
        super(NeuralNet, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size1)  # Primo strato hidden
        self.relu1 = nn.ReLU()  # Funzione di attivazione
        self.dropout1 = nn.Dropout(0.2)
        self.fc2 = nn.Linear(hidden_size1, hidden_size2)  # Secondo strato hidden
        self.relu2 = nn.ReLU()  # Funzione di attivazione
        self.dropout2 = nn.Dropout(0.2)
        self.fc3 = nn.Linear(hidden_size2, output_size)  # Output layer
    
    def forward(self, x):
        out = self.fc1(x)
        out = self.relu1(out)
        out = self.dropout1(out)
        out = self.fc2(out)
        out = self.relu2(out)
        out = self.dropout2(out)
        out = self.fc3(out)
        return out

# Parametri del modello prova
input_size = 8
hidden_size1 = 64
hidden_size2 = 32
output_size = 5

# Inizializzare il modello
model = NeuralNet(input_size, hidden_size1, hidden_size2, output_size)

# Carica i pesi del modello salvati
model.load_state_dict(torch.load('src/models/best_model.pth', map_location=torch.device('cpu')))
model.eval()  # Metti il modello in modalità valutazione

# Carica lo scaler salvato
scaler = joblib.load('src/models/scaler.pkl')

# Mappa delle classi
labels = ['Rosso', 'Arancione', 'Giallo', 'Verde', 'Blu']

# Nomi delle feature (devono essere gli stessi usati durante il fitting dello scaler)
cols_to_normalize = ['Frequenza Cardiaca', 'Pressione Sistolica', 'Pressione Diastolica', 
                     'Frequenza Respiratoria', 'Temperatura', 'Saturazione di Ossigeno', 'Scala del Dolore']

# Funzione per effettuare la predizione
def predict(input_data):
    # Creare un DataFrame con i nomi delle feature
    input_df = pd.DataFrame([input_data[:-1]], columns=cols_to_normalize)

    # Normalizzazione usando lo scaler
    input_data_normalized = scaler.transform(input_df)

    # Aggiungere lo stato di coscienza come ultima colonna
    input_data_full = np.concatenate([input_data_normalized, [[input_data[-1]]]], axis=1)
    input_tensor = torch.tensor(input_data_full, dtype=torch.float32)

    # Inferenza
    output = model(input_tensor)
    _, predicted = torch.max(output, 1)
    return labels[predicted.item()]

if __name__ == "__main__":
    try:
        # Leggere i parametri dalla riga di comando
        params = list(map(float, sys.argv[1:]))
        if len(params) != 8:
            raise ValueError("Sono richiesti esattamente 8 parametri: Frequenza Cardiaca, Pressione Sistolica, Pressione Diastolica, Frequenza Respiratoria, Temperatura, Saturazione di Ossigeno, Scala del Dolore, Stato di Coscienza.")
        
        # Predire il codice colore
        result = predict(params)
        print(result)  # Restituire il risultato al backend
    except Exception as e:
        print(f"Errore: {str(e)}", file=sys.stderr)
        sys.exit(1)
