        // Recupera i dati passati tramite query string
        const params = new URLSearchParams(window.location.search);
    
        // Rendi visibili i dati nella pagina
        const summaryContent = document.getElementById('summaryContent');
        const data = JSON.parse(decodeURIComponent(params.get('data')));
        const prediction = params.get('prediction');
        let content = `
            <p><strong>Frequenza Cardiaca:</strong> ${data.frequenza_cardiaca}</p>
            <p><strong>Frequenza Respiratoria:</strong> ${data.frequenza_respiratoria}</p>
            <p><strong>Temperatura:</strong> ${data.temperatura}</p>
            <p><strong>Saturazione Ossigeno:</strong> ${data.saturazione_ossigeno}</p>
            <p><strong>Scala del Dolore:</strong> ${data.dolore}</p>
            <p><strong>Stato di Coscienza:</strong> ${data.stato_coscienza}</p>
            <p><strong>Pressione Sistolica:</strong> ${data.pressione_sistolica}</p>
            <p><strong>Pressione Diastolica:</strong> ${data.pressione_diastolica}</p>
            <p><strong>Codice Predetto:</strong> ${prediction}</p>
        `;
        summaryContent.innerHTML = content;
    
        // Gestione del salvataggio dei dati
        document.getElementById("saveDataForm").addEventListener("submit", async (event) => {
            event.preventDefault();
    
            const codiceColoreAssegnato = document.getElementById("codiceColoreAssegnato").value;
            const motivo = document.getElementById("motivo").value;
    
            try {
                const response = await fetch("http://localhost:3000/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, predizione_algoritmo: prediction, codiceColoreAssegnato, motivo }),
                });
    
                if (response.ok) {
                    alert("Dati salvati con successo!");
                    window.location.href = '/';
                } else {
                    alert("Errore durante il salvataggio dei dati.");
                }
            } catch (error) {
                console.error("Errore:", error);
                alert("Errore durante il salvataggio");
            }
        });