//----------------------- DADOS ------------------------//
var representantes=[];
var numeros=[];
var fotos=[];
var votos=[];
var resultados=[];


// ------------------------ CAPTURANDO TURMA ESCOLHIDA -----------------------------// 

var opcoes= document.querySelectorAll(".opcoes");
var turmaEscolhida;

for(var i=0; i < opcoes.length; i++){

    opcoes[i].onchange= function(){

        let select= document.querySelectorAll(".opcoes");

        for(var j=0;j < select.length; j++){

            let optionValue= select[j].options[select[j].selectedIndex];
            var value= optionValue.value;

                if(value != "opcao"){
                    turmaEscolhida=value;
                }
        }
       
    }
}

// ----------------- CAPTURANDO CANDIDATOS E NUMEROS DA TURMA ESCOLHIDA --------------------// 

var botao= document.querySelector("#btnProximo1");

function capturaDados(){

    for(var i=0; i < turmas.turma.length; i++){


        if(turmaEscolhida == turmas.turma[i].sala){

            for(var j=0; j < turmas.turma[i].nome.length; j++){

                representantes.push(turmas.turma[i].nome[j]);
                numeros.push(turmas.turma[i].numero[j]);
                fotos.push(turmas.turma[i].foto[j]);

            }

        }
    }


}
botao.addEventListener("click",capturaDados);

function insertAfter(newElement, reference) {
    reference.parentNode.insertBefore(newElement, reference.nextSibling);
}

// ----------------- MOSTRANDO DIV DOS CANDIDATOS --------------------//

function apresentarCandidatos(){

    // ------------------------- ADICIONAR DIVS 
    for(let i=0; i < representantes.length; i++){

        let div= document.createElement('div');
        div.className= "info";

        let div2= document.querySelector("#candidato");
        var divPai= div2.parentNode;

        divPai.insertBefore(div,div2);
    }

    // ------------------------- CONTEÚDO ÁS DIVS

    let divs=document.querySelectorAll(".info");

    // ------------------------- ADICIONAR NUMERO ÀS DIVS

    for(let i=0; i < representantes.length; i++){

        let numeroDiv= document.createElement("p");
        numeroDiv.classList.add("numero");
        numeroDiv.innerText= numeros[i];
        divs[i].appendChild(numeroDiv);

    }

    // ------------------------- ADICIONAR INPUT ÁS DIVS

    for(let i=0; i < representantes.length; i++){

        let img= document.createElement("img");
        img.classList.add("imagemCandidato");
        img.src= fotos[i];
        divs[i].appendChild(img);

       

    }   

    // ------------------------- ADICIONAR REPRESENTANTE

    for(let i=0; i < representantes.length; i++){

        let representanteDiv= document.createElement("p");
        representanteDiv.classList.add("representante");
        representanteDiv.innerText= representantes[i];
        divs[i].appendChild(representanteDiv);

    }

    // ------------------------- ADICIONAR TURMA

    for(let i=0; i < representantes.length; i++){

        let turmaDiv= document.createElement("p");
        turmaDiv.classList.add("turma");
        turmaDiv.innerText= turmaEscolhida;
        divs[i].appendChild(turmaDiv);

    }

}
botao.addEventListener("click",apresentarCandidatos);


// ----------------------------- CONFIGURAÇOES URNA/VOTAÇÃO ---------------------------------

var numerosUrna= document.querySelectorAll(".numeros");
var nomeResult= document.querySelector(".nomeResultado");
var imgResult= document.querySelector(".imagemUrna");

var escolha=0;
var quantidade=0;
function insert(num){

    let numero= document.getElementById('resultadoUrna').innerHTML;

    if(quantidade < 2){
        document.getElementById('resultadoUrna').innerHTML= numero+num;
        quantidade++;
    }
    if(quantidade == 2 && numero.length == 2){
     
        for(var i=0; i< representantes.length; i++){
            
            if(numero == numeros[i]){
                nomeResult.innerHTML= representantes[i];
                imgResult.src= fotos[i];
            }
        }
    }
} 

// ----------------- CONFIGURANDO CONFIRMA --------------

var corrigir= document.querySelector(".corrige");

function corrige(){
    quantidade=0;
    nomeResult.innerHTML= "";
    imgResult.src= " ";
    document.getElementById('resultadoUrna').innerHTML= "";
    msg.style.display= 'none';
}
corrigir.addEventListener("click", corrige); 

// ----------------- CONFIGURANDO CORRIGE --------------

var confirmar= document.querySelector(".confirma");
var msg= document.querySelector(".fim");

function confirma(){
    votos.push(document.getElementById('resultadoUrna').innerHTML);
    msg.style.display= 'block';
    
    apagar();
}
confirmar.addEventListener("click", confirma);

function apagar(){
    setTimeout(corrige, 3000);
}

// ----------------- ENCERRANDO VOTACAO E CONTANDO VOTOS --------------

var encerra= document.querySelector(".encerrar");

function encerrar(){
    
        for(var i=0; i < representantes.length; i++){
        
            var quantidadeElementos = votos.filter(resultado).length;

            function resultado(value){
                return value == numeros[i];
            }

           resultados.push(quantidadeElementos);
        }

        apresentar();

}
encerra.addEventListener("click", encerrar);

function apresentar(){

    var janela= window.open('', '', 'width=800, height=600, font-size=100');

    janela.document.write(`Turma: ${turmaEscolhida}`);
    
    for(var i=0; i < representantes.length; i++){
        janela.document.write("<h1 size='50px'>");
        janela.document.write(`Chapa ${representantes[i]} recebeu ${resultados[i]} votos`);
        janela.document.write("</h1>");
        janela.document.write("<br>");
    }
    janela.document.close();
    janela.print();
}