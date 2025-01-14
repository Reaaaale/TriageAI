document.getElementById("prediction-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita il ricaricamento della pagina

    const data = {
        frequenza_cardiaca: document.getElementById('frequenza_cardiaca').value,
        pressione_sistolica: document.getElementById('pressione_sistolica').value,
        pressione_diastolica: document.getElementById('pressione_diastolica').value,
        frequenza_respiratoria: document.getElementById('frequenza_respiratoria').value,
        temperatura: document.getElementById('temperatura').value,
        saturazione_ossigeno: document.getElementById('saturazione_ossigeno').value,
        dolore: document.getElementById('dolore').value,
        stato_coscienza: document.getElementById('stato_coscienza').value,
    };

    try {
        const response = await fetch("http://localhost:3000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        // Mostra il risultato
        const resultDiv = document.getElementById("result");
        resultDiv.classList.remove("hidden");
        document.getElementById("prediction-result").innerText = `Il codice colore predetto è: ${result.prediction}`;

        // Mostra il modale di conferma
        document.getElementById("confirmModal").classList.remove("hidden");

        // Gestione salvataggio
        document.getElementById("saveYes").onclick = () => {
            const queryString = `?data=${encodeURIComponent(
                JSON.stringify(data)
            )}&prediction=${result.prediction}`;
            window.location.href = `summary.html${queryString}`;
        };

        document.getElementById("saveNo").onclick = () => {
            document.getElementById("confirmModal").classList.add("hidden");
        };
    } catch (error) {
        console.error("Errore:", error);
        document.getElementById("prediction-result").innerText = "Errore durante la predizione.";
        document.getElementById("result").classList.remove("hidden");
    }
});
