window.onload = cargarTabla();

function cargarTabla(){
    if(localStorage.getItem("partidas")== null){
        window.location.assign("index.html");
    }

    // Donde se carga la tabla
    var resultado = document.querySelector("#resultado");
    resultado.innerHTML = "";
    // Datos a guardar
    let datos = extraerLS();

    let tr_h = document.createElement("tr");
    // thead ==> Claves de objeto = cabeceras de columna
    var array_keys = Object.keys(datos[0]);
    for (let key of array_keys){
        let th = document.createElement("th");
        th.scope = "col";
        th.onclick = ordenar;
        th.innerHTML = key;
        tr_h.appendChild(th);
    }
    
    let thead= document.createElement("thead");
    thead.appendChild(tr_h);
    
    // tbody ==> Contenido de la tabla
    let tbody = document.createElement("tbody");
    for (partida of datos){
        var tr_b = document.createElement("tr");
        tbody.appendChild(tr_b);
        for (clave of array_keys){
            let td = document.createElement("td");
            td.innerHTML = partida[clave];
            tr_b.appendChild(td);
        }
    }  

    // tabla con thead y tbody
    let tabla= document.createElement("table");
    tabla.className ="table";
    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    resultado.appendChild(tabla);
}

function extraerLS(){
    let arrayLS = JSON.parse(localStorage.getItem("partidas"));
    return arrayLS;
}

function ordenar(){
    let valor = this.innerHTML;
    let array_objetos = extraerLS();
    // Ordeno el array
    array_objetos.sort(function(a, b) {
        var x = a[valor]; var y = b[valor];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    localStorage.setItem("partidas", JSON.stringify(array_objetos));
    cargarTabla();
}
function volverJugar(){
    localStorage.removeItem("usuarioActivo");
    window.location.assign("index.html");
}