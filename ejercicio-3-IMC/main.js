function calcularIMC(){
    var estatura =document.getElementById("estatura").value;
    var peso = document.getElementById("peso").value;

    console.log("estatura", estatura);
    console.log("peso", peso);

    var imc = peso / Math.pow(estatura,2);
    console.log(imc);

    var respuesta = document.getElementById("res");

    if (respuesta.childElementCount == 0){
        var imagen_tag = document.createElement("img");
        var texto_tag = document.createElement("h3");

        imagen_tag.id = "img";
        imagen_tag.height = "200";
        texto_tag.id = "texto";
        respuesta.appendChild(imagen_tag);
        respuesta.appendChild(texto_tag);
    } 
    var imagen = document.getElementById("img");
    var texto = document.getElementById("texto");

    if (imc < 16){
        imagen.src = "img/raspa.jpg";
        texto.innerHTML = " CUIDADO: DESNUTRIDO (IMC: " + parseFloat(imc).toFixed(2) + ")";
    }
    if (imc >=16 && imc <18){
        imagen.src = "img/galgo.jpg";
        texto.innerHTML = " OJO: DELGADO (IMC: " + parseFloat(imc).toFixed(2) + ")";
    }
    if (imc >= 18 && imc < 25){
        imagen.src = "img/caballo.jpg";
        texto.innerHTML = " ENHORABUENA: IDEAL (IMC: " + parseFloat(imc).toFixed(2) + ")";
    }
    if (imc >= 25 && imc < 31){
        imagen.src = "img/hipo.jpg";
        texto.innerHTML = " OJO: SOBREPESO (IMC: " + parseFloat(imc).toFixed(2) + ")";
    }
    if (imc >=31){
        imagen.src = "img/ballena.png";
        texto.innerHTML = " CUIDADO: OBESO (IMC: " + parseFloat(imc).toFixed(2) + ")";
    }

}