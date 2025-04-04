import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("aviso-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const mensagem = document.getElementById("mensagem").value;
  const cor = document.getElementById("cor").value;
  const dataInicio = document.getElementById("dataInicio").value;
  const dataDelete = document.getElementById("dataDelete").value;
  const autor = document.getElementById("autor").value;

  const muralRef = ref(db, "Mural");
  const novoAvisoRef = push(muralRef);

  set(novoAvisoRef, {
    titulo,
    mensagem,
    cor,
    dataInicio,
    dataDelete,
    autor
  })
  .then(() => {
    alert("Aviso lançado com sucesso!");
    document.getElementById("aviso-form").reset();
  })
  .catch((error) => {
    alert("Erro ao lançar aviso: " + error.message);
  });
});
