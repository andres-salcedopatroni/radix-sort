$(document).ready(function () {
    $("#ordenar").click(ordenar);
});

var arr = [];
var t ;
var velocidad ;
var animacion = [];
var cantidad;
var maximo;
var minimo;
var max;
var ancho;

function crearElementos(v) {
    let con = [];
    con.length = 0;
    for (let k = 0; k < cantidad; k++) {
        con.push(Math.floor(Math.random() * (maximo - minimo + 1)) + minimo);
    }
    ancho = (Math.floor(Math.log10(maximo))  + 1)* 10;
    for (let b = 0; b < cantidad; b++) {
        if(b==0){
            max=con[b];
        }else{
            if(max<con[b]){
                max=con[b];
            }
        }
        let m = document.createElement("div");
        m.id = "rect" + (b + 1);
        m.className = "divCreado";
        m.textContent = con[b];
        m.style.top = 300 - (300 * con[b]) / maximo + "px";
        m.style.height = (300 * con[b]) / maximo + "px";
        m.style.width = ancho + "px";
        arr.push(con[b]);
        v.appendChild(m);
    }
}

function desaparece( i, pos, valor) {
    animacion.push(
        setTimeout(function () {
            document.getElementById("rect" + i).style.backgroundColor = "green";
            document.getElementById("r" + pos).style.backgroundColor = "green";
            document.getElementById("r" + pos).textContent = valor + "";
        }, t)
    );
    t = t + velocidad;
    animacion.push(
        setTimeout(function () {
            document.getElementById("rect" + i).textContent = i + "";
            document.getElementById("rect" + i).style.width = (Math.floor(Math.log10(i) + 1)*10) + "px";
            document.getElementById("rect" + i).style.backgroundColor = "black";
            document.getElementById("r" + pos).style.backgroundColor = "white";
        }, t)
    );
    t = t - velocidad;
}

function muestra(i, pos, valor) {
    animacion.push(
        setTimeout(function () {
            document.getElementById("rect" + i).style.opacity = 1;
            document.getElementById("rect" + i).textContent = valor + "";
            document.getElementById("rect" + i).style.top = 300 - (300 * valor) / maximo + "px";
            document.getElementById("rect" + i).style.height =(300 * valor) / maximo + "px";
            document.getElementById("rect" + i).style.width = ancho + "px";
            document.getElementById("rect" + i).style.backgroundColor = "green";
            document.getElementById("r" + pos).style.backgroundColor = "green";
            document.getElementById("r" + pos).textContent = i - 1 + "";
        }, t)
    );
    t = t + velocidad;
    animacion.push(
        setTimeout(function () {
            document.getElementById("rect" + i).style.backgroundColor = "blue";
            document.getElementById("r" + pos).style.backgroundColor = "white";
        }, t)
    );
    t = t - velocidad;
}

function actualizar(pos, valor) {
    animacion.push(
        setTimeout(function () {
            document.getElementById("r" + pos).style.backgroundColor = "red";
            document.getElementById("r" + pos).textContent = valor + "";
        }, t)
    );
    t = t + velocidad;
    animacion.push(
        setTimeout(function () {
            document.getElementById("r" + pos).style.backgroundColor = "white";
        }, t)
    );
    t = t - velocidad;
}

function reiniciar(pos) {
    animacion.push(
        setTimeout(function () {
            document.getElementById("r" + pos).style.backgroundColor = "white";
            document.getElementById("r" + pos).textContent = "0";
        }, t)
    );
}

function cifra(e) {
    animacion.push(
        setTimeout(function () {
            document.getElementById("digito").textContent=e+"";
        }, t)
    );
}

function CountingSort(e) {
    /*factorVel captura el valor del factor de velocidad seleccionado
    si se selecciona "normal" entonces factorVel = 2
    si se selecciona "rapido" entonces factorVel = 1*/
    var factorVel = parseInt(document.forms.formulario1.velocidad.value);
    if (factorVel == 1) {

        velocidad = 250;

    }else{

        velocidad=700;

    }
    var c = [];

    for (var i = 0; i < 10; i++) {
        c[i] = 0;
    }
    var v1 = [];

    for (var i = 0; i < arr.length; i++) {
        c[Math.floor(arr[i] / e) % 10] = c[Math.floor(arr[i] / e) % 10] + 1;
        let valor = c[Math.floor(arr[i] / e) % 10];
        let pos = Math.floor(arr[i] / e) % 10;
        desaparece( i + 1, pos + 1, valor);
        t = t + velocidad;
        v1.push(0);
    }
    t = t + 2 * velocidad;
    for (var i = 1; i < 10; i++) {
        c[i] = c[i] + c[i - 1];
        actualizar(i + 1, c[i]);
        t = t + velocidad;
    }

    for (var i = arr.length - 1; i >= 0; i--) {
        v1[c[Math.floor(arr[i] / e) % 10] - 1] = arr[i];
        muestra(
            c[Math.floor(arr[i] / e) % 10],
            (Math.floor(arr[i] / e) % 10) + 1,
            arr[i]
        );
        c[Math.floor(arr[i] / e) % 10] = c[Math.floor(arr[i] / e) % 10] - 1;
        t = t + velocidad;
    }
    arr = v1;
}

function ordenar() {
    cantidad = parseInt(document.getElementById("cantidad").value);
    maximo = parseInt(document.getElementById("maximo").value);
    minimo = parseInt(document.getElementById("minimo").value);
    arr = [];

    for (var i = 0; i < animacion.length; i++) {
        clearTimeout(animacion[i]);
    }

    t = 0;
    for (var j = 0; j < 10; j++) {
        reiniciar(j + 1);
    }

    $("#lienzoRadix").empty();

    let v = document.getElementById("lienzoRadix");

    if ((maximo > minimo) & (cantidad > 0) & minimo>=0) {
        crearElementos(v);
        t=2500;
        v.style.textAlign = "center";

        var tiempo=performance.now();
        var e = 1;

        for (let i = 0; i <= Math.log10(max); i++) {
            cifra(Math.log10(e)+1);
            CountingSort(e);
            e = e * 10;
            t = t + velocidad;
            for (var j = 0; j < 10; j++) {
                reiniciar(j + 1);
            }
        }
        console.log(arr);
        var tiempof=performance.now();
        document.getElementById("tiempo").textContent=(tiempof-tiempo)/1000+" segundos";
    }
}
