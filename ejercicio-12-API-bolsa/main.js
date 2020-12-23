const URL_ALPHA = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=";
const URL_fin ="&interval=5min&apikey=AHKQVGL2O97P05FF";
//TODO VALIDAR LA ENTRADA
var xhr = new XMLHttpRequest();


function calcularURL(){
    let ticker = document.getElementById("ticker").value;
    console.log(ticker);
    let url = URL_ALPHA + ticker + URL_fin;
    console.log(url);
    return(url);

}
function buscar(){
    let url = calcularURL();

    xhr.open("GET", url);
    xhr.onreadystatechange = recibirDatos;
    xhr.send();
    console.log("petición enviada");
}
function recibirDatos(){
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
    console.log(datos["Time Series (5min)"]);
    resp.innerHTML = "Última actualización: " + datos["Meta Data"]["3. Last Refreshed"] + " - Precio: "+ 
    + datos["Time Series (5min)"][datos["Meta Data"]["3. Last Refreshed"]]["1. open"];
}