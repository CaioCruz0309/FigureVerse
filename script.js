function abrirPesquisa() {
const campo = document.getElementById("campodepesquisa");

if (!campo) return;

campo.classList.toggle("aberto");

if (campo.classList.contains("aberto")) {
    campo.focus();
}


}

function pesquisar() {
const campo = document.getElementById("campodepesquisa");

if (!campo) return;

const texto = campo.value.toLowerCase().trim();
const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {

    const titulo = card.querySelector("h2");

    if (!titulo) return;

    const nome = titulo.textContent.toLowerCase();

    if (nome.includes(texto)) {
        card.style.display = "flex";
    } else {
        card.style.display = "none";
    }

});


}


let carrinho = [];


const btnCarrinho =
document.getElementById("btnCarrinho");

const carrinhoElement =
document.getElementById("carrinho");

const fundoCarrinho =
document.getElementById("fundoCarrinho");

const fecharCarrinho =
document.getElementById("fecharCarrinho");

const listaCarrinho =
document.getElementById("listaCarrinho");

const totalCarrinho =
document.getElementById("totalCarrinho");

const contadorCarrinho =
document.getElementById("contadorCarrinho");

if (btnCarrinho) {

btnCarrinho.addEventListener("click", function() {

    if (carrinhoElement) {
        carrinhoElement.classList.add("aberto");
    }

    if (fundoCarrinho) {
        fundoCarrinho.classList.add("aberto");
    }

});


}


function fecharCarrinhoFuncao() {

if (carrinhoElement) {
    carrinhoElement.classList.remove("aberto");
}

if (fundoCarrinho) {
    fundoCarrinho.classList.remove("aberto");
}


}

if (fecharCarrinho) {

fecharCarrinho.addEventListener(
    "click",
    fecharCarrinhoFuncao
);


}

if (fundoCarrinho) {

fundoCarrinho.addEventListener(
    "click",
    fecharCarrinhoFuncao
);


}


function adicionarProduto(nome, preco, imagem) {

preco = Number(preco);

const produtoExistente = carrinho.find(
    produto => produto.nome === nome
);

if (produtoExistente) {

    produtoExistente.quantidade++;

}



else {

    carrinho.push({

        nome: nome,

        preco: preco,

        imagem: imagem,

        quantidade: 1

    });

}


atualizarCarrinho();



if (carrinhoElement) {
    carrinhoElement.classList.add("aberto");
}

if (fundoCarrinho) {
    fundoCarrinho.classList.add("aberto");
}


}


function aumentarQuantidade(nome) {

const produto = carrinho.find(
    produto => produto.nome === nome
);


if (!produto) {
    return;
}


produto.quantidade++;


atualizarCarrinho();


}

function diminuirQuantidade(nome) {

const produto = carrinho.find(
    produto => produto.nome === nome
);


if (!produto) {
    return;
}


produto.quantidade--;



if (produto.quantidade <= 0) {

    carrinho = carrinho.filter(
        produto => produto.nome !== nome
    );

}


atualizarCarrinho();


}


function removerProduto(nome) {

carrinho = carrinho.filter(
    produto => produto.nome !== nome
);


atualizarCarrinho();


}



function atualizarCarrinho() {



if (!listaCarrinho) {

    console.error(
        "Erro: o elemento #listaCarrinho não foi encontrado no HTML."
    );

    return;

}




listaCarrinho.innerHTML = "";


if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `
        <div class="carrinho-vazio">
            <p>Seu carrinho está vazio.</p>
            <p>Adicione alguma action figure.</p>
</div>

    `;

}



else {

    carrinho.forEach(function(produto) {

        const item =
            document.createElement("div");


        item.classList.add(
            "item-carrinho"
        );


        item.innerHTML = `

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
            >


            <div class="info-carrinho">

                <h3>
                    ${produto.nome}
                </h3>


                <div class="preco-carrinho">

                    R$
                    ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}

                </div>


                <div class="quantidade">

                    <button
                        type="button"
                        onclick="diminuirQuantidade('${produto.nome}')"
                    >
                        −
                    </button>


                    <span>
                        ${produto.quantidade}
                    </span>


                    <button
                        type="button"
                        onclick="aumentarQuantidade('${produto.nome}')"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="remover"
                    onclick="removerProduto('${produto.nome}')"
                >
                    Remover
                </button>

            </div>

        `;


        listaCarrinho.appendChild(item);

    });

}



atualizarTotal();



atualizarContador();


}


function atualizarTotal() {

let total = 0;


carrinho.forEach(function(produto) {

    total +=
        produto.preco *
        produto.quantidade;

});


if (totalCarrinho) {

    totalCarrinho.textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");

}


}


function atualizarContador() {

let quantidadeTotal = 0;


carrinho.forEach(function(produto) {

    quantidadeTotal +=
        produto.quantidade;

});


if (contadorCarrinho) {

    contadorCarrinho.textContent =
        quantidadeTotal;

}


}


document.addEventListener(
"DOMContentLoaded",
function() {

    atualizarCarrinho();

}


);
