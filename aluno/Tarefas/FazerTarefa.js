import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

// Configuração do Firebase (firebase-config.js)
const firebaseConfig = {
  apiKey: "AIzaSyCL2e1Zi-pzXQZ-02vQf6I8rYjbi5IzaRo",
  authDomain: "aula-miraculosa.firebaseapp.com",
  databaseURL: "https://aula-miraculosa-default-rtdb.firebaseio.com",
  projectId: "aula-miraculosa",
  storageBucket: "aula-miraculosa.firebasestorage.app",
  messagingSenderId: "1067250456026",
  appId: "1:1067250456026:web:632e43e793155444035ce3",
  measurementId: "G-QLCBW93HRX"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function carregarTarefas() {
    // Referência para o caminho "tarefas" no Realtime Database
    const tarefasRef = ref(db, "tarefas");

    try {
        const snapshot = await get(tarefasRef);
        if (snapshot.exists()) {
            const tarefas = snapshot.val(); // Pega os dados retornados
            const tarefasContainer = document.getElementById("tarefas-lista");
            tarefasContainer.innerHTML = ""; // Limpa antes de adicionar novas tarefas

            // Itera sobre as tarefas e cria os elementos HTML
            for (let id in tarefas) {
                const tarefa = tarefas[id];
                const tarefaDiv = document.createElement("div");
                tarefaDiv.classList.add("tarefa-card");

                // Convertendo datas de strings para Date
                const dataAbertura = new Date(tarefa.dataAbertura);
                const dataEntrega = new Date(tarefa.dataEntrega);

                tarefaDiv.innerHTML = `
                    <h3>${tarefa.materia} - ${tarefa.nomeAtividade}</h3>
                    <p>Status: ${tarefa.status || 'Não Definido'}</p>
                    <p>Data de Abertura: ${dataAbertura.toLocaleDateString()}</p>
                    <p>Prazo Final: ${dataEntrega.toLocaleDateString()}</p>
                    <a href="${tarefa.link}" target="_blank">Ver Tarefa</a>
                `;

                tarefasContainer.appendChild(tarefaDiv);
            }
        } else {
            console.log("Nenhuma tarefa encontrada.");
        }
    } catch (error) {
        console.error("Erro ao carregar tarefas: ", error);
    }
}

// Carregar as tarefas quando a página for aberta
window.onload = carregarTarefas;
