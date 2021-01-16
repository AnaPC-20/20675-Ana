const URL_PERROS = "https://dog.ceo/api/";
var xhr = new XMLHttpRequest();
var tipo_llamada;

window.onload = function() {
    tipo_llamada = "load";
    var url_razas = URL_PERROS + "breeds/list/all";
    llamarAPI(url_razas);
}

function buscarFotos(){
    tipo_llamada ="fotos";
    var listado = document.getElementById("razas");
    var raza = listado.options[listado.selectedIndex].text;
    console.log(raza);
    if(raza == "--Sin filtro--"){
        var url_fotos = URL_PERROS + "breeds/image/random/9";
    }else{
        var url_fotos = URL_PERROS + "breed/" + raza + "/images/random/9";
    }
    llamarAPI(url_fotos);
}

function llamarAPI(url){
    console.log("URL = " + url);
    xhr.open("GET", url);
    xhr.onreadystatechange = recibirDatos;
    xhr.send();
    console.log("petición enviada");
}

function recibirDatos(){
    console.log("entra en Recibir Datos", xhr.readyState);
    if (xhr.readyState == 4) {
        console.log("respuesta rx");
        var resp = document.getElementById("respuesta");

        switch (xhr.status) {
            case 200:
                console.log("Todo OK");
                if (tipo_llamada== "load"){
                    console.log("entra en load")
                    buscarRazas();
                }
                if(tipo_llamada== "fotos"){
                    console.log("entra en fotos")
                    cargarPanel();
                }
                break;
            case 204:
                resp.style.color = "red";
                resp.innerHTML = "El servidor no contesta. Status: " + xhr.status;
                break;
            case 400:
                resp.style.color = "red";
                resp.innerHTML = "Petición al servidor mal hecha. Status: " + xhr.status;
                break;
            default:
                resp.style.color = "red";
                resp.innerHTML = "Caso no identificado. Status: " + xhr.status;
        }
    } else {
        console.log("STATUS", xhr.readyState);
    }
}

function buscarRazas(){
    var razas = JSON.parse(xhr.responseText).message;
    console.log("razas",razas);
    var listado = document.getElementById("razas");
    var cont="1";
    console.log(listado);
    for(raza in razas){
        var item = document.createElement("option");
        item.value = cont;
        item.innerHTML= raza;
        listado.appendChild(item);
        console.log(item, cont,raza);
        cont++; 
    } 
}

function cargarPanel(){
    var fotos = JSON.parse(xhr.responseText).message;
    console.log(fotos);
    var tablero = document.getElementsByTagName("img");
    console.log(tablero);
    for (let i= 0; i<tablero.length; i++){
     
        if(i< fotos.length){
            tablero[i].src = fotos[i];
        } else{
            if(i == fotos.length){
                tablero[i].src = "https://ak.picdn.net/shutterstock/videos/30951796/thumb/1.jpg";
            }else{
                tablero[i].src = "https://i.pinimg.com/originals/8d/7f/55/8d7f557a26bfa3dc85491ff7825913b1.jpg";
            } 
        }
    }
}