// Lista de alunos
const alunos = [
    "Abreba", "Ayu03212", "Blackxzsr", "Brenopwf", "Brinnbolen", "Bugnette",  
    "Cf_elise99_08545", "Coei0177", "Danielcraftim", "Dearladyjupiter", "Eliseueureka",  
    "Etic_rossi", "Felix", "Gwentennyson_2010", "Hopxmika", "Ichigo739",  
    "Jonybee__74049", "Jorgeluisbazanflores", "Jujutsu_kaisen113", "Jw_1980",  
    "Kakila", "Kane_piezcfcbfr", "Ked0_0.", "Ldancra57", "Lisa038149",  
    "Lorenzoferraz", "Luckza8", "Macacomago", "Mapadeluz", "Marlissonblanc",  
    "Mathspa", "Mepcmaster2024", "Meucoelho", "Mim1zrsh", "Miraculizado",  
    "Mphelixcoisinho", "Nicolas120795", "O_ryan.55", "Phelixcoisinho",  
    "Princessofstars3", "Quited_quited", "Realm_of_jewels", "Ronald_claw_26",  
    "Rosaluc_", "Rosiearegold279", "Sonecadom_", "Solarias2", "Springtrap4947",  
    "Symphonny.z", "Truewikipedia", "Vd_ozzie.zz_67296"
];

// Espera a página carregar para preencher a tabela
document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.querySelector("#tabela-alunos tbody");

    if (!tabela) {
        console.error("Erro: Tabela de alunos não encontrada!");
        return;
    }

    // Preenchendo a tabela com os alunos
    alunos.forEach((aluno, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${aluno}</td>
            <td>
                <button class="btn btn-compareceu" onclick="marcarPresenca(this, '${aluno}')">P</button>
                <button class="btn btn-faltou" onclick="marcarFalta(this, '${aluno}')">F</button>
            </td>
        `;

        tabela.appendChild(linha);
    });

    // Evento do botão "Marcar todos como Compareceram"
    document.getElementById("marcar-todos").addEventListener("click", () => {
        document.querySelectorAll(".btn-compareceu").forEach(botao => botao.classList.add("selecionado"));
        document.querySelectorAll(".btn-faltou").forEach(botao => botao.classList.remove("selecionado"));
    });

    // Evento do botão "Salvar Frequência"
    document.getElementById("salvar").addEventListener("click", salvarFrequencia);
});

// Marcar como Compareceu
function marcarPresenca(botao, aluno) {
    const linha = botao.parentElement;
    linha.querySelector(".btn-compareceu").classList.add("selecionado");
    linha.querySelector(".btn-faltou").classList.remove("selecionado");
}

// Marcar como Faltou
function marcarFalta(botao, aluno) {
    const linha = botao.parentElement;
    linha.querySelector(".btn-faltou").classList.add("selecionado");
    linha.querySelector(".btn-compareceu").classList.remove("selecionado");
}

// Função para salvar a frequência no Firebase
function salvarFrequencia() {
    const dataLancamento = document.getElementById("data-lancamento").value;
    const horarioAula = document.getElementById("horario-aula").value;

    if (!dataLancamento || !horarioAula) {
        alert("Por favor, preencha todos os campos antes de salvar.");
        return;
    }

    const presencas = {
        alunos_faltantes: [],
        alunos_comparecentes: [],
        data: dataLancamento,
        horario: horarioAula
    };

    document.querySelectorAll("#tabela-alunos tr").forEach((linha, index) => {
        if (index === 0) return; // Ignorar cabeçalho
        const nomeAluno = linha.cells[1].innerText;
        const compareceu = linha.querySelector(".btn-compareceu").classList.contains("selecionado");
        const faltou = linha.querySelector(".btn-faltou").classList.contains("selecionado");

        if (compareceu) {
            presencas.alunos_comparecentes.push(nomeAluno);
        } else if (faltou) {
            presencas.alunos_faltantes.push(nomeAluno);
        }
    });

    // Enviando os dados para o Firebase
    fetch("https://aula-miraculosa-default-rtdb.firebaseio.com/chamada.json", {
        method: "POST",
        body: JSON.stringify(presencas),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Chamada salva com sucesso:", data);
        alert("Frequência salva com sucesso!");
    })
    .catch(error => {
        console.error("Erro ao salvar a chamada:", error);
        alert("Erro ao salvar a chamada.");
    });
}
