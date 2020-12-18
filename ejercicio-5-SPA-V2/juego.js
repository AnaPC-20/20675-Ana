window.onload = cargar_web;

// Variables globales
var num_ramdom = Math.floor(Math.random() * (101 - 1)) + 1;
var total_vidas = 5;
var num_vidas;
var num_errores;
var array_vidas = [];
var num_jugados = [];

console.log("numero random", num_ramdom);

function cargar_web() {

    if (getUser()){
        document.getElementById("user").innerHTML = getUser();
    }else {
        cambiarUsuario();
    }

    // Panel contador vidas y errores

    var div_vidas = document.getElementById("vidas");
    num_vidas = total_vidas;
    num_errores = 0;

    for (var i = 0; i < num_vidas; i++) {
    
        let img_vida = document.createElement("img");
        img_vida.width = "50";
        img_vida.src = "img/vida.jpg";
        img_vida.className = "vidas";
        array_vidas[i] = img_vida;
        div_vidas.appendChild(array_vidas[i]);
    }

    // Listado de apuestas   
    var div_apuestas = document.getElementById("apuestas");
    for (var i = 0; i < num_vidas; i++) {
        let div_numero = document.createElement("div");
        div_numero.className = "row numeros";
        div_apuestas.appendChild(div_numero);
    }

    // ocultar boton Cambio Usuario, Recargar y Ranking

    document.getElementById("nuevo_user").style.display = "none";
    document.getElementById("recargar").style.display = "none";
    document.getElementById("ranking").style.display = "none";
}

function getUser() {
    return (localStorage.getItem("usuarioActivo"));
}

function cambiarUsuario(){
    localStorage.removeItem("usuarioActivo");
    window.location.assign("index.html");
}

function jugar() {
    var numero_us = parseInt(document.getElementById("numero").value);
    console.log(numero_us);

    num_jugados.push(numero_us);
    num_jugados.sort(function(a, b){
        return a - b;
    });
    console.log(num_jugados);
    
    var lista_apuestas = document.querySelectorAll(".numeros");
    for (let i = 0; i < num_jugados.length; i++){
        if (num_jugados[i] == num_ramdom) {
            lista_apuestas[i].innerHTML = "¡CORRECTO! El número oculto es " + num_jugados[i];
            lista_apuestas[i].style.color = "green";
        }
        if (num_jugados[i] > num_ramdom) {
            lista_apuestas[i].innerHTML = "El número oculto es menor que " + num_jugados[i];
        }
        if (num_jugados[i] < num_ramdom) {
            lista_apuestas[i].innerHTML = "El numero oculto es mayor que " + num_jugados[i];
        }
    }

    num_vidas--;
    num_errores++;
    actualizar_vidas();

    console.log("vidas", num_vidas);
    console.log("errores", num_errores);

    if (numero_us == num_ramdom || num_vidas == 0) {
        fin_juego(numero_us);
    }
}

function actualizar_vidas() {
    var contador = document.querySelectorAll(".vidas");
    console.log(contador);

    for (var i = 0; i < total_vidas; i++) {
        if(i < num_vidas){
            contador[i].src = "img/vida.jpg";
        } else {
            contador[i].src = "img/error.jpg";
        }
    }
}


function fin_juego(numero_jugado) {
    var pagina = document.getElementById("res_fin");
    var fila_nueva = document.createElement("div");
    fila_nueva.className = "row";
    var gif_final= document.createElement("img");
    gif_final.height = 300;
    var texto_final = document.createElement("h5");

    if (numero_jugado == num_ramdom){
        gif_final.src = "img/acierto.gif";
        texto_final.innerHTML = "¡¡Enhorabuena!!. Has acertado el número oculto. ACUMULAS 1 PUNTO";
        texto_final.style.color = "green";

         // Crear objeto partida
        var partida = new Partida(getUser(),num_errores, 1);
    } else{
        gif_final.src = "img/fallo.gif";
        texto_final.innerHTML = "Has agotado todas las vidas. El número oculto es <b>"+ num_ramdom +"</br> ACUMULAS 0 PUNTOS";
        texto_final.style.color = "red";

         // Crear objeto partida
        var partida = new Partida(getUser(),num_errores, 0);
    }

    // Añadir objeto a LS
    partida.anadirLS();
    console.log(partida);
    console.log(getUser());

    pagina.appendChild(fila_nueva);
    fila_nueva.appendChild(texto_final);
    fila_nueva.appendChild(gif_final);

    // Mostrar botón cambio de usuario
    document.getElementById("nuevo_user").style.display = "inline-block";

    // Mostrar botón ver marcador
    document.getElementById("ranking").style.display = "inline-block";

    // Mostrar botón volver a jugar

    document.getElementById("recargar").style.display = "inline-block";
}


