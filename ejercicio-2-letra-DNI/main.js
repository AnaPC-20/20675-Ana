var digitoControl = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];


function calcularDNI(){
    let numeroDNI = 0;
    let resto = 0;

    numeroDNI = document.getElementById("numeroDNI").value;
    resto = numeroDNI % 23;
    escribirRespuesta(numeroDNI,resto);  
}

function calcularNIE() {
    let letraNIE = " ";
    let numeroNIE = 0;
    let resto = 0;
    
    letraNIE = document.getElementById("letraNIE").value.toUpperCase();
    numeroNIE =document.getElementById("numeroNIE").value;

    if(letraNIE != "X" && letraNIE != 'Y' && letraNIE != 'Z'){
        parrafo.innerHTML ="la letra " + letraNIE + " no es válida";
    } else {
        if (letraNIE == "X"){
            resto = numeroNIE %23;
        }
        if (letraNIE == "Y"){
            resto = parseInt("1" + numeroNIE)%23;
        }
        if (letraNIE == "Z"){
            resto = parseInt("2" + numeroNIE)%23;
        }
        escribirRespuesta(letraNIE+numeroNIE, resto);
    }
}

function escribirRespuesta(numero, pos){
    let respuesta = document.getElementById("res");
    let parrafo = respuesta.querySelector("p");
    
    if (parrafo == null){
        parrafo = document.createElement("p");
        respuesta.appendChild(parrafo);
    }
    parrafo.innerHTML = "El dígito de control que corresponde a " + numero+ " es " + digitoControl[pos];
    limpiarFormulario();
}

function limpiarFormulario(){
    let casillas = document.getElementsByTagName("input");
    for (var i=0; i<casillas.length; i++){
        casillas[i].value= "";
    }
    
}
