import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
const database = getDatabase(app);

// Captura o formulário
document.getElementById("tarefa-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página

    // Captura os valores do formulário
    const materia = document.getElementById("materia").value;
    const nomeTarefa = document.getElementById("nome-tarefa").value;
    const dataEntrega = document.getElementById("data-entrega").value;
    const dataAbertura = document.getElementById("data-abertura").value;
    const link = document.getElementById("link").value;

    // Referência ao Firebase (tabela "tarefas")
    const tarefasRef = ref(database, "tarefas");

    // Adiciona nova tarefa ao banco de dados
    const novaTarefaRef = push(tarefasRef);
    set(novaTarefaRef, {
        materia: materia,
        nomeTarefa: nomeTarefa,
        dataEntrega: dataEntrega,
        dataAbertura: dataAbertura,
        link: link,
        concluida: false
    }).then(() => {
        alert("Tarefa lançada com sucesso!");
        document.getElementById("tarefa-form").reset();
    }).catch((error) => {
        alert("Erro ao lançar a tarefa: " + error.message);
    });
});
