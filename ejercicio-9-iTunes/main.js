
const URL_ITUNES = "https://itunes.apple.com/search?media=music&term=";
//TODO VALIDAR LA ENTRADA
var xhr = new XMLHttpRequest();

function calcularURL(artista) {
    let url_completa = '';
    console.log("calcula URL completa");
    url_completa = URL_ITUNES + artista;

    return url_completa;
}
function buscaInfo() {

    let artista = document.getElementById("artista").value;

    //LLAMAR AL SERVIDOR, CON ESE NÚMERO
    let url = calcularURL(artista);
    console.log("URL = " + url);
    xhr.open("GET", url);
    xhr.onreadystatechange = recibirDatosArtista;
    xhr.send();
    console.log("petición enviada");
}
function recibirDatosArtista() {
    console.log("Entra en recibir Datos Artista", xhr.readyState);
    if (xhr.readyState == 4) {
        console.log("respuesta rx");
        var resp = document.getElementById("datos");

        switch (xhr.status) {
            case 200:
                console.log("Todo OK");
                mostrarResultados();
                break;
            case 204:
                resp.style.color = "red";
                resp.innerHTML = "El artista no existe o el servidor no contesta. Status: " + xhr.status;
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

function mostrarResultados(){
    var datos = JSON.parse(xhr.responseText);
    let resp = document.getElementById("datos");
    resp.innerHTML = "<br>";
    console.log(datos.results.length);
    console.log(datos);
    for(let i = 0; i < datos.results.length; i++){
        resp.innerHTML = resp.innerHTML + "Artista: " + datos.results[i].artistName + " - Canción: " + datos.results[i].trackName +"<br>";
    }
}