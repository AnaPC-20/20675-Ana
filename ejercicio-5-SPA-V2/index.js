window.onload = comprobarUser();

function comprobarUser(){
    if(localStorage.getItem("usuarioActivo")){
        window.location.assign("juego.html");
    }
}
function guardarUser(){
    var usuario = document.getElementById("usuario").value;
    localStorage.setItem("usuarioActivo", usuario);
    comprobarUser();
}

