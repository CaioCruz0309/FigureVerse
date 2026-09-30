function abrirPesquisa() {

    const campo = document.getElementById("campodepesquisa");

    campo.classList.toggle("aberto");

    if (campo.classList.contains("aberto")) {
        campo.focus();
    }
}


function pesquisar() {

    const campo = document.getElementById("campodepesquisa");

    const texto = campo.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        const nome = card
            .querySelector("h2")
            .textContent
            .toLowerCase();

        if (nome.includes(texto)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });
}

function botaozoro(){
    
}
