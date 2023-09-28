let arrayDivs = [];

let intervalo;
let contador = 0;

let cartaSeleccionada1 = null;
let cartaSeleccionada2 = null;

function mostrarJuego() {
    const generarGrid = document.getElementById("main");
    generarGrid.style.visibility = "visible";

    const eliminarBoton = document.getElementById("btn");
    eliminarBoton.style.visibility = "hidden";
}

function generarGrid() {
    document.getElementById("botonJugar").textContent = "REINICIAR";
    arrayDivs = [];
    clearInterval(intervalo);
    intervalo = null;
    contador = 0;
    let cartaSeleccionada1 = null;
    let cartaSeleccionada2 = null;
    document.getElementById("aciertos").innerHTML = "";
    document.getElementById("contador").textContent = contador + "s";

    const numero = document.getElementById("numero").value;
    const errorTxt = document.getElementById("error");
    errorTxt.textContent = "";

    const colors = ["#ccff8c", "#81de76", "#3a55b4", "#6caddf", "#8cd9ff", "#7ce4ef", "#96e9f2", "#b0eff5", "#cbf4f9", "#9f7afb", "#6140b6", "#5b04d5", "#7c36dd", "#9d68e6", "#bd9bee", "#decdf7", "#3021d1", "#c2fe81", "#d6feab", "#9e8fda", "#90a6da", "#d6d3f6", "#aca6ed", "#837ae3", "#594dda"];
            
    if (numero % 2 == 0) {
        if (numero <= 50) {
            const raizNumero = Math.sqrt(numero);
            const fila = Math.round(raizNumero);
            const columna = Math.ceil(raizNumero);

            const cantidadColores = colors.slice(0, numero / 2);
            let coloresDisponibles = [];

            cantidadColores.forEach(color => {
                coloresDisponibles.push(color);
                coloresDisponibles.push(color);
            });  

            const container = document.getElementById("marco");
            container.innerHTML = "";

            container.style.gridTemplateRows = `repeat(${fila}, 1fr)`;
            container.style.gridTemplateColumns = `repeat(${columna}, 1fr)`;

            for (let i = 0; i < numero; i++) {
                const nuevoDiv = document.createElement("div");
                nuevoDiv.style.border = "1px solid #6499E9";
                nuevoDiv.id = `nuevoDivId${i}`;

                const randomNumber = Math.floor(Math.random() * coloresDisponibles.length);
                nuevoDiv.style.color = coloresDisponibles.splice(randomNumber, 1);
                
                container.appendChild(nuevoDiv);
                arrayDivs.push(nuevoDiv);
            }
            iniciarContador();
            inicioJuego();
        } else {
            errorTxt.textContent = "¡¡Ten que ser inferior a 50!!";
        }
    } else {
        errorTxt.textContent = "¡¡Este número non é par!!";
    }
}

function iniciarContador() {
    let contador = 0;
    intervalo = setInterval(function () {
        contador++;

        const contadorText = document.getElementById("contador");
        contadorText.style.visibility = "visible";
        contadorText.textContent = contador + "s";
    }, 1000);
}

function inicioJuego() {
    arrayDivs.forEach(function (div) {
        div.addEventListener('click', function cardClick() {
            if (cartaSeleccionada1 == null) {
                cartaSeleccionada1 = div;
                cartaSeleccionada1.style.background = cartaSeleccionada1.style.color;
            } else if (cartaSeleccionada2 == null) {
                cartaSeleccionada2 = div;
                cartaSeleccionada2.style.background = cartaSeleccionada2.style.color;

                if (cartaSeleccionada1.style.color == cartaSeleccionada2.style.color) {
                    const newP = document.createElement("p");
                    const contador = document.getElementById("contador");
                    
                    newP.textContent = "Encontraches unha parella en " + contador.textContent + "!";
                    document.getElementById("aciertos").appendChild(newP);
                    
                    indice1 = arrayDivs.indexOf(cartaSeleccionada1);
                    if(indice1 !== -1) {
                        arrayDivs.splice(indice1, 1);
                    }

                    indice2 = arrayDivs.indexOf(cartaSeleccionada2);
                    if(indice2 !== -1) {
                        arrayDivs.splice(indice2, 1)
                    }

                    cartaSeleccionada1.removeEventListener('click', cardClick);
                    cartaSeleccionada2.removeEventListener('click', cardClick);
                    cartaSeleccionada1 = null;
                    cartaSeleccionada2 = null;

                    if (arrayDivs.length == 0) {
                        const newP = document.createElement("p");
                        newP.style.fontWeight = "bolder";
                        newP.textContent = "Ganaches en " + contador.textContent + "!";
                        document.getElementById("aciertos").appendChild(newP);
                        clearInterval(intervalo);
                    }
                } else {
                    setTimeout(function () {
                        cartaSeleccionada1.style.background = "white";
                        cartaSeleccionada2.style.background = "white";
                        cartaSeleccionada1 = null;
                        cartaSeleccionada2 = null;
                    }, 200);
                }

                
            }
        });
    });
}

