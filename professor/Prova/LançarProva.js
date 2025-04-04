import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Configuração Firebase
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
document.getElementById("prova-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const materia = document.getElementById("materia").value;
    const nomeProva = document.getElementById("nome-prova").value;
    const dataAbertura = document.getElementById("data-abertura").value;
    const dataEntrega = document.getElementById("data-entrega").value;
    const link = document.getElementById("link").value;

    const provasRef = ref(database, "Provas");

    const novaProva = {
        materia: materia,
        nomeProva: nomeProva,
        dataAbertura: dataAbertura,
        dataEntrega: dataEntrega,
        link: link,
        status: "Aberta"
    };

    const novaProvaRef = push(provasRef);
    set(novaProvaRef, novaProva)
        .then(() => {
            alert("Prova lançada com sucesso!");
            document.getElementById("prova-form").reset();
        })
        .catch((error) => {
            alert("Erro ao lançar a prova: " + error.message);
        });
});
