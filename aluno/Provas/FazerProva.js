import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCL2e1Zi-pzXQZ-02vQf6I8rYjbi5IzaRo",
  authDomain: "aula-miraculosa.firebaseapp.com",
  databaseURL: "https://aula-miraculosa-default-rtdb.firebaseio.com",
  projectId: "aula-miraculosa",
  storageBucket: "aula-miraculosa.appspot.com",
  messagingSenderId: "1067250456026",
  appId: "1:1067250456026:web:632e43e793155444035ce3",
  measurementId: "G-QLCBW93HRX"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function carregarProvas() {
    const provasRef = ref(db, "Provas");
    const container = document.getElementById("provas-lista");
    container.innerHTML = "";

    try {
        const snapshot = await get(provasRef);
        if (snapshot.exists()) {
            const provas = snapshot.val();
            let temProvas = false;

            for (let id in provas) {
                temProvas = true;
                const prova = provas[id];
                const div = document.createElement("div");
                div.classList.add("prova-card");

                const dataAbertura = new Date(prova.dataAbertura);
                const dataEntrega = new Date(prova.dataEntrega);

                div.innerHTML = `
                    <h3>${prova.materia} - ${prova.nomeProva}</h3>
                    <p>Status: ${prova.status || "Aberta"}</p>
                    <p>Data de Abertura: ${dataAbertura.toLocaleDateString()}</p>
                    <p>Prazo Final: ${dataEntrega.toLocaleDateString()}</p>
                    <a href="${prova.link}" target="_blank">Ver Prova</a>
                `;

                container.appendChild(div);
            }

            if (!temProvas) {
                container.innerHTML = `<p class="mensagem-vazia">Sem Provas por enquanto, verifique a data das provas!</p>`;
            }

        } else {
            container.innerHTML = `<p class="mensagem-vazia">Sem Provas por enquanto, verifique a data das provas!</p>`;
        }
    } catch (error) {
        console.error("Erro ao carregar provas:", error);
        container.innerHTML = `<p class="mensagem-vazia">Erro ao carregar provas. Tente novamente mais tarde.</p>`;
    }
}

window.onload = carregarProvas;
