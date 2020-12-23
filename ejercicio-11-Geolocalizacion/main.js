let divout = null;

function encuentrame(){
    divout = document.getElementById("out");
    console.log("entra");
    if(!navigator.geolocation){
        fallo();
    } else{
        divout.innerHTML = "Buscando... ";
        navigator.geolocation.getCurrentPosition(exito,fallo);

    }
    
}
function exito(posicion){
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;
    divout.innerHTML = "Latitud = " + latitud + "<br>Longitud = " + longitud; 
}

function fallo(){
    console.log("No esta disponible la ubicación");
    divout.innerHTML = "La ubicación no está disponible."
    divout.style.color = "tomato";
}