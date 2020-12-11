var datos = [];

function guardarCookie(){
    var nombre = document.getElementById("nombre").value;
    datos.push(nombre);
    console.log(nombre);
    window.localStorage.setItem("usuarios", datos);
    window.location.assign("juego.html");
}