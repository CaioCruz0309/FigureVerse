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

    aplicarFiltros();
}



function obterPrecoCard(card) {
    const elementoPreco = card.querySelector(".preco-linha h4");

    if (!elementoPreco) return 0;

    const texto = elementoPreco.textContent
        .replace(/[^\d,.-]/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    return Number(texto) || 0;
}

function abrirFiltro() {
    const filtro = document.getElementById("filtroPreco");

    if (!filtro) return;

    filtro.classList.toggle("aberto");

    if (filtro.classList.contains("aberto")) {
        filtro.focus();
    }
}

function filtrarProdutos() {
    aplicarFiltros();
}

function aplicarFiltros() {
    const galeria = document.querySelector(".galeria");
    const campoPesquisa = document.getElementById("campodepesquisa");
    const filtro = document.getElementById("filtroPreco");

    if (!galeria) return;

    const cards = Array.from(galeria.querySelectorAll(".card"));

    cards.forEach((card, index) => {
        if (card.dataset.ordem === undefined) {
            card.dataset.ordem = index;
        }
    });

    const texto = campoPesquisa
        ? campoPesquisa.value.toLowerCase().trim()
        : "";

    const opcao = filtro ? filtro.value : "original";

    cards.sort((a, b) => {
        const precoA = obterPrecoCard(a);
        const precoB = obterPrecoCard(b);

        if (opcao === "menor") {
            return precoA - precoB;
        }

        if (opcao === "maior") {
            return precoB - precoA;
        }

        return Number(a.dataset.ordem) - Number(b.dataset.ordem);
    });

    cards.forEach(card => {
        const titulo = card.querySelector("h2");
        const nome = titulo
            ? titulo.textContent.toLowerCase()
            : "";

        const preco = obterPrecoCard(card);

        let dentroDaFaixa = true;

        if (opcao === "ate50") {
            dentroDaFaixa = preco <= 50;
        } else if (opcao === "50a100") {
            dentroDaFaixa = preco >= 50 && preco <= 100;
        } else if (opcao === "acima100") {
            dentroDaFaixa = preco > 100;
        }

        const correspondePesquisa = nome.includes(texto);

        card.style.display =
            correspondePesquisa && dentroDaFaixa ? "flex" : "none";

        galeria.appendChild(card);
    });
}


let carrinho = [];

const btnCarrinho = document.getElementById("btnCarrinho");
const carrinhoElement = document.getElementById("carrinho");
const fundoCarrinho = document.getElementById("fundoCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");
const contadorCarrinho = document.getElementById("contadorCarrinho");

function abrirCarrinho() {
    carrinhoElement?.classList.add("aberto");
    fundoCarrinho?.classList.add("aberto");
}

function fecharCarrinhoFuncao() {
    carrinhoElement?.classList.remove("aberto");
    fundoCarrinho?.classList.remove("aberto");
}

btnCarrinho?.addEventListener("click", abrirCarrinho);
fecharCarrinho?.addEventListener("click", fecharCarrinhoFuncao);
fundoCarrinho?.addEventListener("click", fecharCarrinhoFuncao);

function adicionarProduto(nome, preco, imagem) {
    preco = Number(preco);

    if (!Number.isFinite(preco) || preco < 0) {
        alert("Preço inválido.");
        return;
    }

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

function aumentarQuantidade(nome) {
    const produto = carrinho.find(
        produto => produto.nome === nome
    );

    if (!produto) return;

    produto.quantidade++;
    atualizarCarrinho();
}

function diminuirQuantidade(nome) {
    const produto = carrinho.find(
        produto => produto.nome === nome
    );

    if (!produto) return;

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

function formatarReais(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarCarrinho() {
    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = `
            <div class="carrinho-vazio">
                <p>Seu carrinho está vazio.</p>
                <p>Adicione alguma action figure.</p>
            </div>
        `;
    } else {
        carrinho.forEach(produto => {
            const item = document.createElement("div");
            item.className = "item-carrinho";

            const imagem = document.createElement("img");
            imagem.src = produto.imagem;
            imagem.alt = produto.nome;

            const info = document.createElement("div");
            info.className = "info-carrinho";

            const titulo = document.createElement("h3");
            titulo.textContent = produto.nome;

            const preco = document.createElement("div");
            preco.className = "preco-carrinho";
            preco.textContent = formatarReais(produto.preco);

            const quantidade = document.createElement("div");
            quantidade.className = "quantidade";

            const diminuir = document.createElement("button");
            diminuir.type = "button";
            diminuir.textContent = "−";
            diminuir.setAttribute("aria-label", "Diminuir quantidade");
            diminuir.addEventListener("click", () => {
                diminuirQuantidade(produto.nome);
            });

            const numero = document.createElement("span");
            numero.textContent = produto.quantidade;

            const aumentar = document.createElement("button");
            aumentar.type = "button";
            aumentar.textContent = "+";
            aumentar.setAttribute("aria-label", "Aumentar quantidade");
            aumentar.addEventListener("click", () => {
                aumentarQuantidade(produto.nome);
            });

            quantidade.append(diminuir, numero, aumentar);

            const remover = document.createElement("button");
            remover.type = "button";
            remover.className = "remover";
            remover.textContent = "Remover";
            remover.addEventListener("click", () => {
                removerProduto(produto.nome);
            });

            info.append(titulo, preco, quantidade, remover);
            item.append(imagem, info);
            listaCarrinho.appendChild(item);
        });
    }

    atualizarTotal();
    atualizarContador();
    atualizarResumoCheckout();
}

function atualizarTotal() {
    const total = calcularSubtotal();

    if (totalCarrinho) {
        totalCarrinho.textContent = formatarReais(total);
    }
}

function atualizarContador() {
    const quantidadeTotal = carrinho.reduce(
        (soma, produto) => soma + produto.quantidade,
        0
    );

    if (contadorCarrinho) {
        contadorCarrinho.textContent = quantidadeTotal;
    }
}


const telaCheckout = document.getElementById("telaCheckout");
const telaSucesso = document.getElementById("telaSucesso");
const formCheckout = document.getElementById("formCheckout");

const botaoFinalizar = document.querySelector(".finalizar-compra");
const botaoVoltarCarrinho = document.getElementById("voltarCarrinho");
const botaoVoltarInicio = document.getElementById("voltarInicio");

const resumoProdutos = document.getElementById("resumoProdutos");
const subtotalCheckout = document.getElementById("subtotalCheckout");
const descontoCheckout = document.getElementById("descontoCheckout");
const totalCheckout = document.getElementById("totalCheckout");

function calcularSubtotal() {
    return carrinho.reduce((soma, produto) => {
        return soma + produto.preco * produto.quantidade;
    }, 0);
}

function calcularDesconto() {
    if (!cupomAplicado) return 0;

    const porcentagem = cuponsDisponiveis[cupomAplicado] || 0;

    return Math.round(calcularSubtotal() * porcentagem) / 100;
}

function calcularTotalFinal() {
    return Math.max(0, calcularSubtotal() - calcularDesconto());
}

function atualizarResumoCheckout() {
    if (resumoProdutos) {
        resumoProdutos.innerHTML = "";

        carrinho.forEach(produto => {
            const linha = document.createElement("div");
            linha.className = "resumo-produto";

            const nome = document.createElement("span");
            nome.textContent =
                `${produto.nome} × ${produto.quantidade}`;

            const preco = document.createElement("strong");
            preco.textContent = formatarReais(
                produto.preco * produto.quantidade
            );

            linha.append(nome, preco);
            resumoProdutos.appendChild(linha);
        });
    }

    const subtotal = calcularSubtotal();
    const desconto = calcularDesconto();
    const total = calcularTotalFinal();

    if (subtotalCheckout) {
        subtotalCheckout.textContent = formatarReais(subtotal);
    }

    if (descontoCheckout) {
        descontoCheckout.textContent = "- " + formatarReais(desconto);
    }

    if (totalCheckout) {
        totalCheckout.textContent = formatarReais(total);
    }
}

botaoFinalizar?.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    atualizarResumoCheckout();
    fecharCarrinhoFuncao();

    telaCheckout?.classList.add("aberto");
    document.body.style.overflow = "hidden";

    window.scrollTo(0, 0);
});

botaoVoltarCarrinho?.addEventListener("click", () => {
    telaCheckout?.classList.remove("aberto");
    document.body.style.overflow = "";

    abrirCarrinho();
});



const cuponsDisponiveis = {
    PATY: 10,
    LATRELGOSTOSO: 15,
    67: 67,
    
};

let cupomAplicado = null;

const campoCupom = document.getElementById("campoCupom");
const btnAplicarCupom = document.getElementById("btnAplicarCupom");
const btnRemoverCupom = document.getElementById("btnRemoverCupom");
const mensagemCupom = document.getElementById("mensagemCupom");

function mostrarMensagemCupom(mensagem, tipo) {
    if (!mensagemCupom) return;

    mensagemCupom.textContent = mensagem;
    mensagemCupom.className = tipo;
}

function aplicarCupom() {
    if (!campoCupom) return;

    if (carrinho.length === 0) {
        mostrarMensagemCupom("Seu carrinho está vazio.", "erro");
        return;
    }

    const codigo = campoCupom.value.trim().toUpperCase();

    if (!codigo) {
        mostrarMensagemCupom("Digite um código de cupom.", "erro");
        return;
    }

    if (!Object.prototype.hasOwnProperty.call(cuponsDisponiveis, codigo)) {
        mostrarMensagemCupom(
            "Cupom inválido. Confira o código e tente novamente.",
            "erro"
        );
        return;
    }

    cupomAplicado = codigo;

    campoCupom.value = codigo;
    campoCupom.disabled = true;

    if (btnAplicarCupom) {
        btnAplicarCupom.disabled = true;
    }

    if (btnRemoverCupom) {
        btnRemoverCupom.hidden = false;
    }

    mostrarMensagemCupom(
        `Cupom ${codigo} aplicado! Você ganhou ${cuponsDisponiveis[codigo]}% de desconto.`,
        "sucesso"
    );

    atualizarResumoCheckout();
}

function removerCupom() {
    cupomAplicado = null;

    if (campoCupom) {
        campoCupom.value = "";
        campoCupom.disabled = false;
    }

    if (btnAplicarCupom) {
        btnAplicarCupom.disabled = false;
    }

    if (btnRemoverCupom) {
        btnRemoverCupom.hidden = true;
    }

    mostrarMensagemCupom("Cupom removido.", "");

    atualizarResumoCheckout();
}

btnAplicarCupom?.addEventListener("click", aplicarCupom);
btnRemoverCupom?.addEventListener("click", removerCupom);

campoCupom?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        aplicarCupom();
    }
});


formCheckout?.addEventListener("submit", event => {
    event.preventDefault();

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    if (!formCheckout.reportValidity()) return;

    const dados = new FormData(formCheckout);
    const pagamento = dados.get("pagamento");

    if (!pagamento) {
        alert("Selecione uma forma de pagamento.");
        return;
    }

    const totalPago = calcularTotalFinal();

    console.log("Compra demonstrativa:", {
        produtos: carrinho.map(produto => ({ ...produto })),
        cupom: cupomAplicado,
        total: totalPago,
        pagamento: pagamento
    });

    telaCheckout?.classList.remove("aberto");
    telaSucesso?.classList.add("aberto");

    carrinho = [];
    atualizarCarrinho();

    cupomAplicado = null;

    if (campoCupom) {
        campoCupom.disabled = false;
        campoCupom.value = "";
    }

    if (btnAplicarCupom) {
        btnAplicarCupom.disabled = false;
    }

    if (btnRemoverCupom) {
        btnRemoverCupom.hidden = true;
    }

    mostrarMensagemCupom("", "");

    formCheckout.reset();

});


function voltarParaLoja() {
    telaSucesso?.classList.remove("aberto");
    telaCheckout?.classList.remove("aberto");

    document.body.style.overflow = "";

    fecharCarrinhoFuncao();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

botaoVoltarInicio?.addEventListener("click", voltarParaLoja);


document.addEventListener("DOMContentLoaded", () => {
    atualizarCarrinho();
    aplicarFiltros();
});
