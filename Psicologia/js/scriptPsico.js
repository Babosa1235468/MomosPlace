let x = 0;
let botaoAntigo;
let opcaoSelecionada;
let vidas = 3;
let tamanhoCerebroMultiplicador = 0;

function PassarProxPergunta() {
    MostrarMaisPergunta.style.display = "none";
    EsconderTodas.style.display = "";

    const perguntas = document.getElementsByClassName("pergunta");
    const quadrados = document.querySelectorAll(".quadrado");
    const imagem = document.getElementById("imagemCanto");

    // esconder todas
    for (let i = 0; i < perguntas.length; i++) {
        perguntas[i].style.display = "none";
    }

    // terminou todas as perguntas → MODAL FINAL
    if (x >= perguntas.length) {
        document.getElementById("acertosFinal").textContent = x=1;

        let modalFinal = new bootstrap.Modal(document.getElementById('modalFinal'));
        modalFinal.show();
        return;
    }

    // mostrar pergunta atual
    perguntas[x].style.display = "block";
    quadrados[x].classList.add("ativo");

    // aumentar cérebro
    const novoTamanho = 100 + (tamanhoCerebroMultiplicador + 1) * 25;
    imagem.style.width = novoTamanho + "px";

    x++;
    tamanhoCerebroMultiplicador++;
}

function ResetJogo() {
    window.location = window.location;
}

function SelecionarOpcao(botao, CorretaOuErrada) {
    if (botaoAntigo != null) {
        botaoAntigo.style.transform = "scale(1)";
        botaoAntigo.style.opacity = "0.7";
        botaoAntigo.style.boxShadow = "";
    }

    botao.style.transform = "scale(1.1)";
    botao.style.opacity = "1";
    botaoAntigo = botao;

    opcaoSelecionada = CorretaOuErrada;
}

function VerificarResposta() {
    if (opcaoSelecionada == null) {
        alert("Selecione uma opção antes de verificar!");
        return;
    }

    // RESPOSTA ERRADA
    if (opcaoSelecionada !== "correta") {
        botaoAntigo.style.boxShadow = "0 0 20px #ff0000";

        document.getElementById("Vida" + vidas).style.display = "none";
        vidas--;
        tamanhoCerebroMultiplicador -= 1;

        if (vidas === 0) {
            let texto = document.getElementById("OSequeriaEUmFofinhoEGostoso");
            texto.innerHTML = tamanhoCerebroMultiplicador + "/10 Respostas corretas";
            let modal = new bootstrap.Modal(document.getElementById('modalGameOver'));
            modal.show();
            return;
        }

        setTimeout(() => {
            PassarProxPergunta();
            opcaoSelecionada = null;
            botaoAntigo = null;
        }, 800);

        return;
    }

    // RESPOSTA CORRETA
    botaoAntigo.style.boxShadow = "0 0 20px #00ff00";

    setTimeout(() => {
        PassarProxPergunta();
        opcaoSelecionada = null;
        botaoAntigo = null;
    }, 800);
}
