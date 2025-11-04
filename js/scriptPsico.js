function MostrarPergunta(pergunta) {
    let divsPerguntas = document.getElementsByClassName("pergunta");
    for (i=0; i<divsPerguntas.length; i++){
        if (divsPerguntas[i].id != "pergunta_" + pergunta){
            divsPerguntas[i].style.display = "none";
        }
    }
}
function MostrarTodas(){
    let divPergunta = document.getElementsByClassName("perguntas");
    divPergunta.style.display = "";
    let divsPerguntas = document.getElementsByClassName("pergunta");
    for (i=0; i<divsPerguntas.length; i++){
        divsPerguntas[i].style.display = "none";
    }
}