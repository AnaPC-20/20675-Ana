class Partida{
    constructor(user, intentos, aciertos){
        this.user = user;
        this.intentos = intentos;
        this.aciertos = aciertos;
        console.log ("objeto creado");
    }

    resultado (){
        console.log("USER: "+ this.user + "\nIntentos: "+ this.intentos);
    }
    
    anadirLS(){

        let ls_contenido = [];
        if( localStorage.getItem("partidas")){
            ls_contenido = JSON.parse(localStorage.getItem("partidas"));
        }
        ls_contenido.push(this);
        localStorage.setItem("partidas", JSON.stringify(ls_contenido));

        console.log("añadirdo a LS", ls_contenido);
    }
}
