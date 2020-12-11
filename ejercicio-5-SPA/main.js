window.onload = cargar_web;

// Variables globales
var num_ramdom = Math.floor(Math.random() * (101 - 1)) + 1;
var total_vidas = 5;
var num_vidas;
var num_errores;
var array_vidas = [];

console.log("numero random", num_ramdom);
console.log ("usuario", window.localStorage.getItem("nombre"));



function cargar_web() {

    getUsuario();

    var div_vidas = document.getElementById("vidas");
    var pag = document.getElementById("principal");

    num_vidas = total_vidas;
    num_errores = 0;

    for (var i = 0; i < num_vidas; i++) {
        let img_vida = document.createElement("img");
        img_vida.width = "50";
        img_vida.src = "img/vida.jpg";
        img_vida.className = "vidas";
        array_vidas[i] = img_vida;
        div_vidas.appendChild(array_vidas[i]);
        console.log(array_vidas[i]);

        let div_res = document.createElement("div");
        div_res.className = "row";

        let p_res = document.createElement("p");
        p_res.className = "p_res";

        pag.appendChild(div_res);
        div_res.appendChild(p_res);
    }

}

function getUsuario() {
    var user = document.getElementById("user");
    user.innerHTML = window.localStorage.getItem("nombre");
}
function cambiarUsuario(){
    window.location.assign("intro_nombre.html");
}

function jugar() {
    var numero_us = document.getElementById("numero").value;
    console.log(numero_us);

    var contador = document.querySelectorAll(".p_res");
    console.log(contador);

    if (numero_us == num_ramdom) {
        fin_juego();
    }
    if (numero_us > num_ramdom) {
        contador[num_errores].innerHTML = "El número oculto es menor que " + numero_us;

        num_vidas--;
        num_errores++;
    }
    if (numero_us < num_ramdom) {
        contador[num_errores].innerHTML = "El numero oculto es mayor que " + numero_us;
        num_vidas--;
        num_errores++;
    }

    console.log("vidas", num_vidas);
    console.log("errores", num_errores);

    if (num_vidas == 0) {
        fin_juego();
    }

    actualizar_vidas();

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

function fin_juego() {
    var pagina = document.getElementById("res_fin");
    var fila_nueva = document.createElement("div");
    fila_nueva.className = "row";
    var img_gif = document.createElement("img");
    img_gif.height = 300;

    var h5_extra = document.createElement("h5");
    pagina.appendChild(h5_extra);

    if (num_errores < num_vidas){
        img_gif.src = "img/acierto.gif";
        h5_extra.innerHTML = "¡¡Enhorabuena!! El número oculto era " + num_ramdom +". FIN DE JUEGO";
        h5_extra.style.color = "green";
    } else{
        img_gif.src = "img/fallo.gif";
        h5_extra.innerHTML = "Has agotado todas las vidas. FIN DE JUEGO";
        h5_extra.style.color = "red";
    }

    pagina.appendChild(fila_nueva);
    fila_nueva.appendChild(img_gif);


    // OJO, no funciona el evento
    var boton_div = document.getElementById("nuevo_user");
    var boton = document.createElement("button");
    boton.className = "btn btn-outline-secondary";
    boton.onclick = cambiarUsuario;
    boton.type = "button";
    boton.value = "Cambiar usuario";
}


