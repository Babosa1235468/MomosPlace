let x = 0;

function MostrarPergunta() {
    const perguntas = document.getElementsByClassName("pergunta");
    const quadrados = document.querySelectorAll(".quadrado");
    const imagem = document.getElementById("imagemCanto");

    // Esconde todas perguntas
    for (let i = 0; i < perguntas.length; i++) {
        perguntas[i].style.display = "none";
    }

    // Mostra próxima pergunta e ativa quadrado
    if (x < perguntas.length) {
        perguntas[x].style.display = "block";
        quadrados[x].classList.add("ativo");

        // aumenta a imagem proporcionalmente
        const novoTamanho = 70 + (x+1) * 15; // cada quadrado aumenta 15px
        imagem.style.width = novoTamanho + "px";

        x++;
    } 
}

function EsconderTodas() {
    const perguntas = document.getElementsByClassName("pergunta");
    const quadrados = document.querySelectorAll(".quadrado");
    const imagem = document.getElementById("imagemCanto");

    for (let i = 0; i < perguntas.length; i++) {
        perguntas[i].style.display = "none";
        quadrados[i].classList.remove("ativo");
    }

    imagem.style.width = "70px"; // reset imagem
    x = 0;
}