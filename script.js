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

// ======================================================
// CARRINHO
// ======================================================

let carrinho = [];

// ======================================================
// ELEMENTOS DO CARRINHO
// ======================================================

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

// ======================================================
// ABRIR CARRINHO
// ======================================================

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

// ======================================================
// FECHAR CARRINHO
// ======================================================

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

// ======================================================
// ADICIONAR PRODUTO
// ======================================================

function adicionarProduto(nome, preco, imagem) {

// Converte o preço para número
preco = Number(preco);

// Procura se o produto já existe
const produtoExistente = carrinho.find(
    produto => produto.nome === nome
);


// ==================================================
// PRODUTO JÁ EXISTE
// ==================================================

if (produtoExistente) {

    produtoExistente.quantidade++;

}


// ==================================================
// NOVO PRODUTO
// ==================================================

else {

    carrinho.push({

        nome: nome,

        preco: preco,

        imagem: imagem,

        quantidade: 1

    });

}


// Atualiza o carrinho
atualizarCarrinho();


// Abre o carrinho automaticamente

if (carrinhoElement) {
    carrinhoElement.classList.add("aberto");
}

if (fundoCarrinho) {
    fundoCarrinho.classList.add("aberto");
}


}

// ======================================================
// AUMENTAR QUANTIDADE
// ======================================================

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

// ======================================================
// DIMINUIR QUANTIDADE
// ======================================================

function diminuirQuantidade(nome) {

const produto = carrinho.find(
    produto => produto.nome === nome
);


if (!produto) {
    return;
}


produto.quantidade--;


// Se chegar a zero, remove o produto

if (produto.quantidade <= 0) {

    carrinho = carrinho.filter(
        produto => produto.nome !== nome
    );

}


atualizarCarrinho();


}

// ======================================================
// REMOVER PRODUTO
// ======================================================

function removerProduto(nome) {

carrinho = carrinho.filter(
    produto => produto.nome !== nome
);


atualizarCarrinho();


}

// ======================================================
// ATUALIZAR CARRINHO
// ======================================================

function atualizarCarrinho() {

// Verifica se a lista existe

if (!listaCarrinho) {

    console.error(
        "Erro: o elemento #listaCarrinho não foi encontrado no HTML."
    );

    return;

}


// Limpa a lista

listaCarrinho.innerHTML = "";


// ==================================================
// CARRINHO VAZIO
// ==================================================

if (carrinho.length === 0) {

    listaCarrinho.innerHTML = `

        <div class="carrinho-vazio">

            <p>
                Seu carrinho está vazio.
            </p>

            <p>
                Adicione algum produto.
            </p>

        </div>

    `;

}


// ==================================================
// CARRINHO COM PRODUTOS
// ==================================================

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


// Atualiza o total

atualizarTotal();


// Atualiza o contador

atualizarContador();


}

// ======================================================
// ATUALIZAR TOTAL
// ======================================================

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

// ======================================================
// ATUALIZAR CONTADOR
// ======================================================

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

// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener(
"DOMContentLoaded",
function() {

    atualizarCarrinho();

}


);
