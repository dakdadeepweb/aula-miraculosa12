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

const professores = {
    "Shadow": "Jho171012",
    "Wendy": "TikkiTransformar123",
    "MrCactu": "Cactu123"
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (alunos.includes(username) && password === "Miraculous123@") {
        alert("Login bem-sucedido como ALUNO!");
        window.location.href = "aluno/Home/Home.html"; 
    } else if (professores[username] && professores[username] === password) {
        alert("Login bem-sucedido como PROFESSOR!");
        window.location.href = "professor/Home/Home.html"; 
    } else {
        alert("Nome ou senha incorretos!");
    }
}
