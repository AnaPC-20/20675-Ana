var jugadores_LS = [];

function gestionar_user(){

    var nombre = document.getElementById("nombre").value;
    var jugador = {
        user: nombre,
        partidas: 0,
        intentos: 0,
        aciertos: 0
    } 
        
    if (!buscarLocalStorage(nombre)){
        guardarLocalStorage(jugador);
    }
    setUsuarioActivo(nombre);
    window.location.href="juego.html";
}

function buscarLocalStorage(nombre){
    var existe = false;
    jugadores_LS = JSON.parse(localStorage.getItem("jugadores"));
    console.log("nombre introducido",nombre);
    if (jugadores_LS){
        for (let jugador of jugadores_LS){
            console.log("jugadores_LS.user", jugador.user);
            if (jugador.user == nombre){
                existe = true;
            }
        }
    }
    return (existe);
}

function guardarLocalStorage(jugador){
    if (jugadores_LS){
        jugadores_LS.push(jugador);
    }else{
       jugadores_LS = [jugador];
    }
    localStorage.setItem("jugadores", JSON.stringify(jugadores_LS));
}

function setUsuarioActivo(user){
    localStorage.setItem("usuarioActivo", user);
}
function actualizar_LS(){
    let array_jugadores = JSON.parse(localStorage.getItem("jugadores"));
    let usuario = localStorage.getItem("usuarioActivo");
    console.log
    for(let jugador of array_jugadores){
        if(jugador.user == usuario){
            jugador.partidas ++;
            jugador.intentos = num_errores;
            if(num_errores != 5){
                jugador.aciertos ++;
            }
        }
    }
    localStorage.setItem("jugadores", JSON.stringify(array_jugadores));
}