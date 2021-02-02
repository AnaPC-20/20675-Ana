// otra fuente datos vacunas https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/ccaa_vacunas.csv

this.onload = carga;

function carga() {

    //muestra spinner 'Cargandoo...' mientras se abre la pagina
    presentLoading();

    //funcion que recoge los datos del github de la web de civio para pintar las graficas de los datos
    //de la comunidad de madrid
    //https://raw.githubusercontent.com/civio/covid-vaccination-spain/main/data.csv
    parseaGraficosCSVMadrid();

}

//necesario para que funcione el menu lateral
async function openMenu() {

    await menuController.open();

}

//necesario para que funcione el spiner de carga de la pagina
async function presentLoading() {

    const loading = await loadingController.create({
        message: 'Cargando...',
        duration: 500
    });

    await loading.present();
}

// --------------------- ACCESO A DATOS ---------------------------------//


// URL del csv de la pagina de civio para pintar los graficos de datos de vacunacion de Madrid
const URL_GRAFICOS_MADRID = "https://raw.githubusercontent.com/civio/covid-vaccination-spain/main/data.csv";



// coge el csv de la pagina de civio para pintar los graficos de datos de vacunacion de Madrid
function parseaGraficosCSVMadrid() {

    console.log("parseaGraficosCSVMadrid");
    fetch(URL_GRAFICOS_MADRID)
        .then(response => response.text())
        .then(data => {
            let array_datos_parseado = parseCSV(data);

            //---- SLIDE 1 -----
            //grafico dosis distribuidas Madrid
            dibujarGraficoMadrid(array_datos_parseado);
            //grafico dosis administradas Madrid
            dibujarGraficoDosisAdministradasMadrid(array_datos_parseado);
            //grafico pauta completada Madrid
            dibujarGraficoDosisPautaCompletaMadrid(array_datos_parseado);

            //---- SLIDE 2 -----
            //grafico dosis distribuidas Madrid
            dibujarGraficoTotal(array_datos_parseado);
            //grafico dosis administradas Madrid
            dibujarGraficoDosisAdministradasTotal(array_datos_parseado);
            //grafico pauta completada Madrid
            dibujarGraficoDosisPautaCompletaTotal(array_datos_parseado);

            //---- SLIDE 3 -----
            // Ultimos datos por CCAA
            dibujarGraficosCCAA(array_datos_parseado);

        })
        .catch(function (error) {
            window.alert("HA FALLADO EL CSV de las graficas de la pagina de civio Error: ", error.message);
            console.log('HA FALLADO EL CSV de las graficas de la pagina de civio. Hubo un problema con la petición Fetch:', error.message);
        });

}
//OTRA FUNCION PARA PARSEAR CSV, A DIFERENCIA DE LA ANTERIOR, DEVUELVE UN ARRAY DE ARRAYS EN EL QUE CADA ARRAY
//ES UNA LINEA DEL CSV
function parseCSV(str) {
    var arr = [];
    var quote = false;  // 'true' means we're inside a quoted field

    // Iterate over each character, keep track of current row and column (of the returned array)
    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c + 1];        // Current character, next character
        arr[row] = arr[row] || [];             // Create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == ',' && !quote) { ++col; continue; }

        // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
        // and move on to the next row and move to column 0 of that new row
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

        // If it's a newline (LF or CR) and we're not in a quoted field,
        // move on to the next row and move to column 0 of that new row
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    //console.log(arr);
    return arr;
}


// --------------------- SLIDE 1: EVOLUCIÓN MADRID POR FECHA -----------------------------------------//

//en el csv los datos llegan de la siguiente forma:
//madrid, posicion 14
//desde el final posicion  - 6, despues cada nueva fecha -20
// oden subarray posicion 0 fecha, posicion 5 dosis entregadas, posicion 6 dosis administradas,
//posicion 7 % sobre entregadas, posicion 8 pauta completada

function dibujarGraficoMadrid(datos) {

    //en este caso el csv es un array en el q cada elemento del array es otro array con los datos de cada
    //fila del csv
    let fechas = [];
    let indiceMadridDesdeElFinal = datos.length;
    //madrid esta en la posicion 7 del array de arrays empezando desde el final
    indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 7;
    console.log("longitud datos ", indiceMadridDesdeElFinal);
    let i = 0;

    while (i < 7) {
        //se recoge el array de la posicion 7 desde el final, q es donde esta el primer dato de madrid
        let formatFecha = datos[indiceMadridDesdeElFinal];
        //en el array resultando las fechas estan en la posicion 0 (la primera del array)
        fechas.push(formatFecha[0]);
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando por el final
        indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 20;
        i++;
    }
    //se da la vuelta al array para que las fechas queden en orden cronologico
    fechas = fechas.reverse();
    i = 0;
    let longitudDosisEntregadas = datos.length;
    //se recoge el array de la posicion 7 desde el final, q es donde esta el primer dato de madrid
    longitudDosisEntregadas = longitudDosisEntregadas - 7;
    let dosisEntregadas = [];

    while (i < 7) {

        let dosis = datos[longitudDosisEntregadas];
        //en el array resultante que cogemos del array de arrays, el dato de dosis entregadas
        //de madrid esta en la posicion 4 empezando desde el principio
        dosisEntregadas.push(dosis[4].replace('.', ""));
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando por el final
        longitudDosisEntregadas = longitudDosisEntregadas - 20;
        i++;
    }
    //se da la vuelta al array para que las dosis entregadas queden en orden cronologico
    dosisEntregadas.reverse();

    var ctx = document.getElementById('myChartMadridEntregadas').getContext('2d');

    dibujarGraficaLinea(ctx, fechas, dosisEntregadas, 'rgb(16, 26, 214)', 'Vacunas distribuidas Madrid');

}

//grafico de dosis administradas Madrid
function dibujarGraficoDosisAdministradasMadrid(datos) {

    let fechas = [];
    let indiceMadridDesdeElFinal = datos.length;
    //el primer dato de madrid empieza en el array de arrays en la posicion 7 empezando por el final
    indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 7;
    console.log("longitud datos ", indiceMadridDesdeElFinal);
    let i = 0;

    while (i < 7) {
        //agregamos las fechas cada 20 posiciones
        let formatFecha = datos[indiceMadridDesdeElFinal];
        //en el array resultante la fecha esta en la posicion 0
        fechas.push(formatFecha[0]);
        //el dato de madrid esta cada 20 posiciones empezando por el final
        indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 20;
        i++;
    }
    //se le da la vuelta al array para que salga en orden cronologico
    fechas = fechas.reverse();

    i = 0;
    let longitudDosisEntregadas = datos.length;
    //el primer dato de madrid empieza en el array de arrays en la posicion 7 empezando por el final

    longitudDosisEntregadas = longitudDosisEntregadas - 7;
    //el array es de dosis administradas, aunque en el nombre figure 'entregadas'
    let dosisEntregadas = [];

    while (i < 7) {

        let dosis = datos[longitudDosisEntregadas];
        //la cifra con las dosis administradas esta en la posicion 5 del array resultante
        dosisEntregadas.push(dosis[5].replace('.', ""));
        //el dato de madrid esta cada 20 posiciones empezando por el final
        longitudDosisEntregadas = longitudDosisEntregadas - 20;
        i++;
    }
    //se le da la vuelta al array para que salga en orden cronologico
    dosisEntregadas.reverse();

    var ctx = document.getElementById('myChartMadridAdministradas').getContext('2d');

    dibujarGraficaLinea(ctx, fechas, dosisEntregadas, 'rgb(226, 83, 3)', 'Vacunas administradas Madrid');

}

//dibuja grafico personas con las dos dosis administrada Madrid
function dibujarGraficoDosisPautaCompletaMadrid(datos) {
    console.log("entra3");
    let fechas = [];
    let indiceMadridDesdeElFinal = datos.length;
    //el primer dato de madrid aparece en la posicion 7 empezando desde el final
    indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 7;
    console.log("longitud datos ", indiceMadridDesdeElFinal);
    let i = 0;

    while (i < 7) {

        let formatFecha = datos[indiceMadridDesdeElFinal];
        //la fecha en el array resultante esta en la posicion 0
        fechas.push(formatFecha[0]);
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando desde el final
        indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 20;
        i++;
    }
    //damos la vuelta al array de fechas para que salga en orden cronologico
    fechas = fechas.reverse();

    i = 0;
    let longitudDosisEntregadas = datos.length;
    //el primer dato de madrid aparece en la posicion 7 empezando desde el final
    longitudDosisEntregadas = longitudDosisEntregadas - 7;
    //el array esde personas con pauta completada, aunque en el nombre aparezca 'dosis entregadas'
    let dosisEntregadas = [];

    while (i < 7) {

        let dosis = datos[longitudDosisEntregadas];
        //el dato de personas con pauta completa aparece en la posicion 7 del array resultante
        dosisEntregadas.push(dosis[7].replace('.', ""));
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando desde el final
        longitudDosisEntregadas = longitudDosisEntregadas - 20;
        i++;
    }
    //damos la vuelta al array de pauta completada para que salga en orden cronologico
    dosisEntregadas.reverse();

    var ctx = document.getElementById('myChartMadridCompletadas').getContext('2d');

    dibujarGraficaLinea(ctx, fechas, dosisEntregadas, 'rgb(83, 225, 162)', 'Vacunas pauta completa Madrid');
}


// --------------------- SLIDE 2: EVOLUCIÓN ESPAÑA POR FECHA ------------------------------------------//

//en el csv los datos llegan de la siguiente forma:
//madrid, posicion 14
//desde el final posicion  - 6, despues cada nueva fecha -20
// oden subarray posicion 0 fecha, posicion 5 dosis entregadas, posicion 6 dosis administradas,
//posicion 7 % sobre entregadas, posicion 8 pauta completada

function dibujarGraficoTotal(datos) {

    //en este caso el csv es un array en el q cada elemento del array es otro array con los datos de cada
    //fila del csv
    let fechas = [];
    let indiceMadridDesdeElFinal = datos.length;
    //madrid esta en la posicion 7 del array de arrays empezando desde el final
    indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 7;
    console.log("longitud datos ", indiceMadridDesdeElFinal);
    let i = 0;

    while (i < 7) {
        //se recoge el array de la posicion 7 desde el final, q es donde esta el primer dato de madrid
        let formatFecha = datos[indiceMadridDesdeElFinal];
        //en el array resultando las fechas estan en la posicion 0 (la primera del array)
        fechas.push(formatFecha[0]);
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando por el final
        indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 20;
        i++;
    }
    //se da la vuelta al array para que las fechas queden en orden cronologico
    fechas = fechas.reverse();
    i = 0;
    let longitudDosisEntregadas = datos.length;
    //se recoge el array de la posicion 7 desde el final, q es donde esta el primer dato de madrid
    longitudDosisEntregadas = longitudDosisEntregadas - 7;
    let dosisEntregadas = [];

    while (i < 7) {

        let dosis = datos[longitudDosisEntregadas];
        //en el array resultante que cogemos del array de arrays, el dato de dosis entregadas
        //de madrid esta en la posicion 4 empezando desde el principio
        dosisEntregadas.push(dosis[4].replace('.', ""));
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando por el final
        longitudDosisEntregadas = longitudDosisEntregadas - 20;
        i++;
    }
    //se da la vuelta al array para que las dosis entregadas queden en orden cronologico
    dosisEntregadas.reverse();

    var ctx = document.getElementById('myChartMadridEntregadas').getContext('2d');

    dibujarGraficaLinea(ctx, fechas, dosisEntregadas, 'rgb(16, 26, 214)', 'Vacunas distribuidas Madrid');

}

//grafico de dosis administradas Total
function dibujarGraficoDosisAdministradasTotal(datos) {

    let fechas = [];
    let indiceMadridDesdeElFinal = datos.length;
    //el primer dato de madrid empieza en el array de arrays en la posicion 7 empezando por el final
    indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 7;
    console.log("longitud datos ", indiceMadridDesdeElFinal);
    let i = 0;

    while (i < 7) {
        //agregamos las fechas cada 20 posiciones
        let formatFecha = datos[indiceMadridDesdeElFinal];
        //en el array resultante la fecha esta en la posicion 0
        fechas.push(formatFecha[0]);
        //el dato de madrid esta cada 20 posiciones empezando por el final
        indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 20;
        i++;
    }
    //se le da la vuelta al array para que salga en orden cronologico
    fechas = fechas.reverse();

    i = 0;
    let longitudDosisEntregadas = datos.length;
    //el primer dato de madrid empieza en el array de arrays en la posicion 7 empezando por el final

    longitudDosisEntregadas = longitudDosisEntregadas - 7;
    //el array es de dosis administradas, aunque en el nombre figure 'entregadas'
    let dosisEntregadas = [];

    while (i < 7) {

        let dosis = datos[longitudDosisEntregadas];
        //la cifra con las dosis administradas esta en la posicion 5 del array resultante
        dosisEntregadas.push(dosis[5].replace('.', ""));
        //el dato de madrid esta cada 20 posiciones empezando por el final
        longitudDosisEntregadas = longitudDosisEntregadas - 20;
        i++;
    }
    //se le da la vuelta al array para que salga en orden cronologico
    dosisEntregadas.reverse();

    var ctx = document.getElementById('myChartMadridAdministradas').getContext('2d');

    dibujarGraficaLinea(ctx, fechas, dosisEntregadas, 'rgb(226, 83, 3)', 'Vacunas administradas Madrid');

}

//dibuja grafico personas con las dos dosis administrada Total
function dibujarGraficoDosisPautaCompletaTotal(datos) {
    console.log("entra3");
    let fechas = [];
    let indiceMadridDesdeElFinal = datos.length;
    //el primer dato de madrid aparece en la posicion 7 empezando desde el final
    indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 7;
    console.log("longitud datos ", indiceMadridDesdeElFinal);
    let i = 0;

    while (i < 7) {

        let formatFecha = datos[indiceMadridDesdeElFinal];
        //la fecha en el array resultante esta en la posicion 0
        fechas.push(formatFecha[0]);
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando desde el final
        indiceMadridDesdeElFinal = indiceMadridDesdeElFinal - 20;
        i++;
    }
    //damos la vuelta al array de fechas para que salga en orden cronologico
    fechas = fechas.reverse();

    i = 0;
    let longitudDosisEntregadas = datos.length;
    //el primer dato de madrid aparece en la posicion 7 empezando desde el final
    longitudDosisEntregadas = longitudDosisEntregadas - 7;
    //el array esde personas con pauta completada, aunque en el nombre aparezca 'dosis entregadas'
    let dosisEntregadas = [];

    while (i < 7) {

        let dosis = datos[longitudDosisEntregadas];
        //el dato de personas con pauta completa aparece en la posicion 7 del array resultante
        dosisEntregadas.push(dosis[7].replace('.', ""));
        //en el array de arrays cada dato de madrid esta cada 20 posiciones empezando desde el final
        longitudDosisEntregadas = longitudDosisEntregadas - 20;
        i++;
    }
    //damos la vuelta al array de pauta completada para que salga en orden cronologico
    dosisEntregadas.reverse();

    var ctx = document.getElementById('myChartMadridCompletadas').getContext('2d');

    dibujarGraficaLinea(ctx, fechas, dosisEntregadas, 'rgb(83, 225, 162)', 'Vacunas pauta completa Madrid');
}

// --------------------- SLIDE 3: ÚLTIMOS DATOS POR CCAA ---------------------------------//

// Los 20 últimos arrays son los datos mas recientes: 17 CCAA + Ceuta + Melilla + Totales
// Las posiciones que nos interesan:
// [0]=fecha informe ;[1]= ccaa, [4]= dosis entregadas, [5]=dosis admin, [6]=% admin sobre entregadas, 
// [7]= pauta completa[8] = fecha ultima vacuna registrada.

function dibujarGraficosCCAA(array_datos) {

    //Datos totales mas recientes
    let datos_totales = array_datos.pop();

    
    // Datos de CCAA mas recientes
    let ccaa = [];
    let dosis_admin = [];
    let dosis_entregadas = [];
    let dosis_adminx2 = [];
    let dosis_por_admin = [];

    for (let i = (array_datos.length - 19); i < array_datos.length; i++) {
        ccaa.push(array_datos[i][1]);
        dosis_admin.push(Number.parseInt(array_datos[i][5].replaceAll(".", "")));
        dosis_entregadas.push(Number.parseInt(array_datos[i][4].replaceAll(".", "")));
        dosis_adminx2.push(Number.parseInt(array_datos[i][7].replaceAll(".", "")));
        Number.parseFloat(dosis_por_admin.push(array_datos[i][6].replaceAll("%", "").replace(",",".")));
    }
    console.log(ccaa);
    console.log(dosis_por_admin);

    // ==> Chart 1: Total vacunas recibidas

    let entregadas_total = Number.parseInt(datos_totales[4].replaceAll(",", ""));
    let num_entregadas = document.getElementById("dosis_totales");
    let chart1_texto = document.getElementById("chart1_text");

    num_entregadas.innerHTML = new Intl.NumberFormat("es-ES").format(entregadas_total);
    //chart1_texto.innerHTML = "texto debajo de la grafica";

    // Datos para la gráfica (ctx, ejeX, ejeY, color, leyenda) 

    let ctx1 = document.getElementById("chart1").getContext('2d');

    dibujargraficaBarras(ctx1, ccaa, dosis_entregadas, 'rgb(16, 26, 214)', 'Vacunas distribuidas por CCAA');

    // ==> Chart 2: Porcentaje de dosis administradas sobre las entregadas.
    let admin_total = Number.parseInt(datos_totales[5].replaceAll(",", ""));
    let admin_por_total = Number.parseInt(datos_totales[6].replaceAll("%", ""));
    let num_admin = document.getElementById("dosis_admin");
    let chart2_texto = document.getElementById("chart2_text");

    num_admin.innerHTML = new Intl.NumberFormat("es-ES").format(admin_total);
    //chart2_texto.innerHTML = "texto";

    // Datos para la gráfica (ctx, ejeX, ejeY, color, leyenda) 

    let ctx2 = document.getElementById("chart2").getContext('2d');

    dibujargraficaBarras(ctx2, ccaa, dosis_por_admin, 'rgb(226, 83, 3)', '% dosis admin. respecto las entregadas');

    // ==> Chart 3: Personas pauta completa.

    let adminx2_total = Number.parseInt(datos_totales[7].replaceAll(",", ""));

    let num_adminx2 = document.getElementById("pauta_comp");
    let chart3_texto = document.getElementById("chart3_text");
    //chart3_texto="texto";
    num_adminx2.innerHTML = new Intl.NumberFormat("es-ES").format(adminx2_total);

    // Datos para la gráfica (ctx, ejeX, ejeY, color, leyenda) 

    let ctx3 = document.getElementById("chart3").getContext('2d');
    dibujargraficaBarras(ctx3, ccaa, dosis_adminx2, 'rgb(83, 225, 162)', "Pauta completa en España");
}


//muestra los datos del texto de Madrid
function muestraDatosVacunaMadrid(dosis) {
    //poblacion total de la comunidad de madrid para calcular los porcentajes
    let poblacionMadrid = 6779888;
    //se formatea el numero para la cifra salga con punto
    let numeroFormateado = new Intl.NumberFormat().format(dosis[13].dosisEntregadas);
    //se calcula el porcentaje de dosis entregadas sobre la poblacion de madrid
    let porcentajeEntregadas = trunc((dosis[13].dosisEntregadas * 100) / poblacionMadrid, 3);
    //se formatea el numero para la cifra salga con punto
    let dosisAdministradas = new Intl.NumberFormat().format(dosis[13].dosisAdministradas);
    //se calcula el porcentaje de dosis administradas sobre la poblacion de madrid
    let porcentPoblacionMadridAdministradas = trunc((dosis[13].dosisAdministradas * 100) / poblacionMadrid, 3);
    //se calcula el porcentaje de adimistradas sobre las entregadas
    let porcentajeAdministradasSobreTotal = (dosis[13].dosisAdministradas * 100) / dosis[13].dosisEntregadas;
    porcentajeAdministradasSobreTotal = trunc(porcentajeAdministradasSobreTotal, 2);

    //se formatea el numero para la cifra salga con punto
    let dosDosis = new Intl.NumberFormat().format(dosis[13].dosisPautaCompletada);
    //porcentaje de dos dosis administradas sobre el total administradas (solo una dosis)
    let porcentajePautaCompletadas = trunc(((dosis[13].dosisPautaCompletada * 100) / dosis[13].dosisAdministradas), 2);
    //porcentaje de gente con la pauta completada sobre la poblacion de madrid
    let porcentajeCompletTotal = trunc(((dosis[13].dosisPautaCompletada * 100) / poblacionMadrid), 2);

    //se recogen los elementos html donde se van a mostrar los datos
    let dosisDistribuidas = document.getElementById("dosisDistribuidas");
    let porcentajeDosisEntregadas = document.getElementById("porcentajeDosisEntregadas");
    let dosisAdministradasTotal = document.getElementById("dosisAdministradas");
    let porcentajeMadridAdministradas = document.getElementById("porcentajePoblacionAdministradas");
    let porcentajeAdministradasTotal = document.getElementById("porcentajeAdministradasTotal");
    let pautaCompleta = document.getElementById("pautaCompleta");
    let porcentajeCompletas = document.getElementById("porcentajeCompletas");
    let porcenSobreTotalCompletas = document.getElementById("porcenSobreTotalCompletas");

    //se muestran los datos
    dosisDistribuidas.innerHTML = numeroFormateado;
    porcentajeDosisEntregadas.innerHTML = porcentajeEntregadas
    dosisAdministradasTotal.innerHTML = dosisAdministradas;
    porcentajeMadridAdministradas.innerHTML = porcentPoblacionMadridAdministradas;
    porcentajeAdministradasTotal.innerHTML = porcentajeAdministradasSobreTotal;
    pautaCompleta.innerHTML = dosDosis
    porcentajeCompletas.innerHTML = porcentajePautaCompletadas;
    porcenSobreTotalCompletas.innerHTML = porcentajeCompletTotal;

}
//NO SE USA, ERA PARA EL SLIDE QUE HEMOS QUITADO DE PORCENTAJES DEL TOTAL DE ESPAÑA
function muestraDatosVacunaEspaña(dosis) {
    //poblacion total España para calcular los porcentajes
    let poblacionEs = 47329000;
    //se formatea el numero para la cifra salga con punto
    let numeroFormateado = dosis[19].dosisEntregadas;
    //se calcula el porcentaje de entregadas sobre la poblacion de España
    let porcentajeEntregadas = trunc((dosis[19].dosisEntregadas * 100) / poblacionEs, 3);
    //se formatea el numero para la cifra salga con punto
    let dosisAdministradas = new Intl.NumberFormat().format(dosis[19].dosisAdministradas);
    //porcentaje dosis administradas sobre la poblacion de España
    let porcentPoblacionMadridAdministradas = trunc((dosis[19].dosisAdministradas * 100) / poblacionEs, 3);
    //porcentaje dosis administradas sobre el total entregadas España
    let porcentajeAdministradasSobreTotal = (dosis[19].dosisAdministradas * 100) / dosis[19].dosisEntregadas;
    porcentajeAdministradasSobreTotal = trunc(porcentajeAdministradasSobreTotal, 2);
    //se formatea el numero para la cifra salga con punto
    let dosDosis = new Intl.NumberFormat().format(dosis[19].dosisPautaCompletada);
    //se calcula el porcentaje de gente con pauta completa sobre las dosis administradas España
    let porcentajePautaCompletadas = trunc(((dosis[19].dosisPautaCompletada * 100) / dosis[19].dosisAdministradas), 2);
    //se calcula el porcentaje de gente con pauta completa sobre la poblacion de España
    let porcentajeCompletTotal = trunc(((dosis[19].dosisPautaCompletada * 100) / poblacionEs), 2);

    //se recogen los elementos html
    let dosisDistribuidas = document.getElementById("dosisDistribuidasEs");
    let porcentajeDosisEntregadas = document.getElementById("porcentajeDosisEntregadasEs");
    let dosisAdministradasTotal = document.getElementById("dosisAdministradasEs");
    let porcentajeMadridAdministradas = document.getElementById("porcentajePoblacionAdministradasEs");
    let porcentajeAdministradasTotal = document.getElementById("porcentajeAdministradasTotalEs");
    let pautaCompleta = document.getElementById("pautaCompletaEs");
    let porcentajeCompletas = document.getElementById("porcentajeCompletasEs");
    let porcenSobreTotalCompletas = document.getElementById("porcenSobreTotalCompletasEs");

    //se muestran los datos
    dosisDistribuidas.innerHTML = numeroFormateado;
    porcentajeDosisEntregadas.innerHTML = porcentajeEntregadas
    dosisAdministradasTotal.innerHTML = dosisAdministradas;
    porcentajeMadridAdministradas.innerHTML = porcentPoblacionMadridAdministradas;
    porcentajeAdministradasTotal.innerHTML = porcentajeAdministradasSobreTotal;
    pautaCompleta.innerHTML = dosDosis
    porcentajeCompletas.innerHTML = porcentajePautaCompletadas;
    porcenSobreTotalCompletas.innerHTML = porcentajeCompletTotal;

}

//funcion sacada de stackoverflow que trunca un numero con decimales para que saque solamente los 2 primeros decimales
function trunc(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}

// --------------------- FUNCIONES PARA LAS GRÁFICAS---------------------------------//


// Gráfica linea
function dibujarGraficaLinea(ctx, ejeX, ejeY, color, leyenda) {
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ejeX,
            datasets: [{
                label: leyenda,
                backgroundColor: color,
                borderColor: 'rgb(255, 255, 255)',
                data: ejeY
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            //aspectRatio: 1,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }

        }
    });
}

// Gráfica linea Slide 2
function dibujarGraficaLineaSlide2(ctx, ejeX, ejeY, color, leyenda) {
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ejeX,
            datasets: [{
                label: leyenda,
                backgroundColor: color,
                borderColor: 'rgb(255, 255, 255)',
                data: ejeY
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            aspectRatio: 1,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }

        }
    });
}

// Gráfica de barras
function dibujargraficaBarras(ctx, ejeX, ejeY, color, leyenda) {

    //OBTENERLOS DATOS
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: ejeX,
            datasets: [{
                label: leyenda,
                barThickness: 2,
                backgroundColor: color,
                borderColor: 'rgb(255, 255, 255)',
                data: ejeY
            }]
        },

        options: {
            responsive: true,
            aspectRatio: 1,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}