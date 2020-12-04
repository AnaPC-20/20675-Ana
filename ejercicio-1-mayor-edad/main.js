/* var edad= window.prompt("Introduce una edad");
console.log(edad);

if(edad>= 18){
    window.alert("Eres mayor de edad");
}else{
    window.alert("Eres menor de edad");
} */


const MAYOR_EDAD =18;

function evaluar(){
    let edad;
    let respuesta;

    edad = document.getElementById("input_edad").value;
    respuesta = document.getElementById("parrafo");
    console.log(edad);

    if(edad < MAYOR_EDAD){
        respuesta.style.color = "red";
        respuesta.innerHTML= "Es menor de edad";
    }else{
        respuesta.style.color = "green";
        respuesta.innerHTML = "Es mayor de edad";
    } 
}