class jugador {

    // MOVER EL PERSONAJE A LA DERECHA
    static moverDerecha(jugador) {

        // CREAMOS UN TIMER
        var timer = setInterval(() => {

            // OBTENEMOS LA POSICION ACTUAL DEL JUGADOR
            var posActual = jugador.offsetLeft

            // INCREMENTAR LA POSICION ACTUAL
            if (posActual < 970) {
                posActual += 12
            }

            // ASIGNAMOS LA NUEVA POSICION AL JUGADOR
            jugador.style.left = posActual + "px"

            // SI LA VARIABLE DETENER DERECHA ES FALSE ENTONCES CORTAMOS EL TIMER
            if (detenerDerecha == false) {
                clearInterval(timer)
            }

        }, 30); // 1 Segundo       

    }

    // MOVER EL PERSONAJE A LA IZQUIERDA
    static moverIzquierda(jugador) {

        // CREAMOS UN TIMER
        var timer = setInterval(() => {

            // OBTENEMOS LA POSICION ACTUAL DEL JUGADOR
            var posActual = jugador.offsetLeft

            // INCREMENTAR LA POSICION ACTUAL
            if (posActual > 0) {
                posActual -= 12
            }

            // ASIGNAMOS LA NUEVA POSICION AL JUGADOR
            jugador.style.left = posActual + "px"

            // SI LA VARIABLE DETENER DERECHA ES FALSE ENTONCES CORTAMOS EL TIMER
            if (detenerIzquierda == false) {
                clearInterval(timer)
            }

        }, 30); // 1 Segundo 

    }

    // CREAR MUNICIONES
    static crearMunicion(jugador) {
        // AGREGAMOS SONIDO
        var sonido = document.createElement("audio")
        sonido.setAttribute("src", "sonidos/bala.mp3")
        sonido.play()

        // CREAR ETIQUETA
        var bala = document.createElement("div")
        bala.setAttribute("class", "bala")

        // SELECCIONAMOS EL MAPA
        var mapa = document.querySelector(".mapa")

        // INLCUIMOS LA BALA EN EL MAPA
        mapa.appendChild(bala)

        // ASIGANAMOS LAS COORDENEAS DE LA BALA
        bala.style.left = jugador.offsetLeft + "px"
        bala.style.top = jugador.offsetTop + "px"

        // CREAMOS EL MOVIMIENTO 
        var timer = setInterval(() => {
            // OBTENEMOS LA POSICION ACTUAL DE LA BALA
            var balaActual = bala.offsetTop

            // DECREMENTAMOS LA POSICION
            balaActual -= 12

            // ASIGNAMOS LA NUEVA POSICION A LA BALA
            bala.style.top = balaActual + "px"

            // SI LA POSICION DE LA BALA ES MEJOR A 0 PIXELES, CORTAMOS EL TIMER Y
            // DESAPARECEMOS LA BALA
            if (balaActual < 10) {
                clearInterval(timer)
                bala.remove()
                sonido.remove()
            }

        }, 30);

    }

    // CREAR MUNICIONES ENEMIGO
    static crearMunicionEnemigo(jugador) {
        // AGREGAMOS SONIDO
        var sonido = document.createElement("audio")
        sonido.setAttribute("src", "sonidos/bala.mp3")
        sonido.play()

        // CREAR ETIQUETA
        var bala = document.createElement("div")
        bala.setAttribute("class", "balaEnemigo")

        // SELECCIONAMOS EL MAPA
        var mapa = document.querySelector(".mapa")

        // INLCUIMOS LA BALA EN EL MAPA
        mapa.appendChild(bala)

        // ASIGANAMOS LAS COORDENEAS DE LA BALA
        bala.style.left = jugador.offsetLeft + "px"
        bala.style.top = jugador.offsetTop + "px"

        if(jugador.getAttribute("class")=="jefe"){
            bala.style.width = "30px"
            bala.style.height = "30px"
            bala.style.background = "-webkit-linear-gradient(top, rgb(158, 21, 192), rgb(177, 32, 206));"
        }

        // CREAMOS EL MOVIMIENTO 
        var timer = setInterval(() => {
            // OBTENEMOS LA POSICION ACTUAL DE LA BALA
            var balaActual = bala.offsetTop

            // DECREMENTAMOS LA POSICION
            balaActual += 12

            // ASIGNAMOS LA NUEVA POSICION A LA BALA
            bala.style.top = balaActual + "px"

            // SI LA POSICION DE LA BALA ES MEJOR A 0 PIXELES, CORTAMOS EL TIMER Y
            // DESAPARECEMOS LA BALA
            if (balaActual > 900) {
                clearInterval(timer)
                bala.remove()
                sonido.remove()
            }

        }, 30);

    }

    // CREAR LOS ENEMIGOS
    static crearEnemigo(vida,tipoNave) {
        // CREAMOS UNA ETIQUETA NUEVA
        var enemigo = document.createElement("div")
        
        //VERIFICAMOS EL TIPO DE NAVE
        if(tipoNave == 0){
            vida=1
            enemigo.setAttribute("class", "enemigo")
        } else{
            vida=50
            enemigo.setAttribute("class", "jefe")
        }
        //INSERTAMOS LA VIDA DEL ENEMIGO
        enemigo.setAttribute("vida",vida)



        // SELECCIONAMOS EL MAPA
        var mapa = document.querySelector(".mapa")

        // INSERTAMOS EL ENEMIGO DENTRO DEL MAPA
        mapa.appendChild(enemigo)

        // GENERAMOS UNA POSICION ALEATORIA
        var posH = Math.floor(Math.random() * 900 - 100) + 100
        enemigo.style.left = posH + "px"

        // ACTIVAMOS LA ANIMACION
        jugador.animacionEnemigo(enemigo)

    }

    // CREAMOS LA ANIMACION DEL ENEMIGO (MOVER A LA DEREHCHA E IZQUIERDA)
    static animacionEnemigo(enemigo) {
        var direccion // 0 Mover a la derecha, 1 Mover a la izquierda

        // TIMER PARA ELEGIR SI SE MUEVE A LA DERECHA O IZQUIERDA
        var timer1 = setInterval(() => {
            direccion = Math.floor(Math.random() * 2)

        }, 500);

        setInterval(() => {
            // ACTIVAMOS LAS MUNICIONES
if(enemigo.offsetLeft>0){
            jugador.crearMunicionEnemigo(enemigo)}
        }, Math.floor(Math.random() * 800 - 300) + 800);

        // TIMER PARA MOVER EL PERSONAJE
        var timer2 = setInterval(() => {

            // OBTENEMOS LA POSICION ACTUAL DEL ENEMIGO
            var posActual = enemigo.offsetLeft

            if (direccion == 0) { // MOVER A LA DERECHA
                posActual += 5

                // SI POSACTUAL PASA DE 970 CAMBIAMOS LA DIRECCION
                if (posActual > 960) {
                    direccion = 1
                }

            }
            else { // SI NO ES 0, MOVER A LA IZQUIERDA
                posActual -= 5
                // SI POSACTUAL ES MENOR DE 10 CAMBIAMOS LA DIRECCION
                if (posActual < 10) {
                    direccion = 0
                }
            }

            // ASIGNAMOS LA NUEVA POSICION AL ENEMIGO
            enemigo.style.left = posActual + "px"

        }, 15);

    }

    // CREAMOS LA DETECCION DE OBJETOS
    static detectarBalas(player, tipoBala, accion) {
        // SELECCIONAMOS TODAS LAS BALAS QUE EXISTEN
        var balas = document.querySelectorAll(tipoBala)

        player = document.querySelectorAll(player)
        player.forEach(function (usuario) {
            // INGRESAMOS A CADA UNA DE LAS BALAS
            balas.forEach(function (item) {
                // OBTENEMOS LAS COORDENADAS Y TAMAÑO DEL JUGADOR
                var jugadorAlto = usuario.clientHeight
                var jugadorAncho = usuario.clientWidth
                var jugadorX = usuario.offsetLeft
                var jugadorY = usuario.offsetTop

                // OBTENEMOS LAS COORDENADAS Y TAMAÑO DE LAS BALAS
                var balaAlto = item.clientHeight
                var balaAncho = item.clientWidth
                var balaX = item.offsetLeft
                var balaY = item.offsetTop

                //BLOQUE 1: INICIO DEL CONTADOR
                //BLOQUE 2: CONDICION (¿CUANDO FINALIZA EL CICLO)
                //BLOQUE 3: EL CONTADOR AUMENTA EN 1 DE VALOR
                for (var c = 0; c < balaAncho + jugadorAncho; c++) {
                    for (var c2 = 0; c2 < balaAlto + jugadorAlto; c2++) {
                        //VERIFICAMOS SI LA BALA A TOCADO AL JUGADOR O ENEMIGO
                        if (jugadorX + jugadorAncho == c + balaX && jugadorY + jugadorAlto == c2 + balaY) {
                            //ELIMINAMOS LA BALA
                            item.remove()
                            //DETECTAMOS LA VIDA
                            var vida= usuario.getAttribute("vida")
                            vida -=1 //REBAJAMOS 1 DE VIDA
                            usuario.setAttribute("vida",vida)//ACTUALIZAMOS VIDA
                            if(vida<=0){//SI LA VIDA ES IGUAL A 0 ENTONCES MUUERE EL ENEMIGO
                                usuario.remove()
                            }
                            //ACCIONES QUE SUCEDEN SOLO PARA EL JUGADOR(NO ENEMIGOS)}
                            if(accion=="jugador"){
                                //SELECCIONAMOS LA BARRA DE VIDAS
                                var barraVidas =document.querySelector(".vidas")
                                //CALCULAMOS LAS VIDAS DEL JUGADOR
                                var hp = vida*30 
                                //INSERTAMOS LA VIDA A LA BARRA DE VIDA
                                barraVidas.style.width = hp + "px"
                            }

                        if(accion== "nave"){
                            //SELECCIONAMOS EL PUNTAJE
                            var puntos = document.querySelector(".puntos")
                            //CANTIDAD DE PUNTOS
                            var cantidad = parseInt(puntos.innerText)
                            cantidad+=5

                            //AGREGAMOS EL PUNTAJE 
                            puntos.innerText = cantidad

                            //VERIFICAMOS EL PUNTAJE
                            if(cantidad == 200 || cantidad == 400 || cantidad == 600 || cantidad == 800 || cantidad == 1000){
                                navesDisponibles++ //INCREMENTAMOS EN UNO 
                            }

                            if( cantidad == 100 || cantidad == 500 || cantidad == 1000){
                                jugador.crearEnemigo(50,1)
                            }
                        }
                        }
                    }
                }
            })
        })
    }

}

// CREAMOS LA VARIABLE JUGADOR (ENLACE A LA ETIQUETA HTML)
var player = document.querySelector(".jugador")

//DETECTAMOS LAS BALAS
setInterval(() => {
    jugador.detectarBalas(".jugador", ".balaEnemigo", "jugador")
    jugador.detectarBalas(".enemigo",".bala","nave")
    jugador.detectarBalas(".jefe",".bala","nave")
}, 10);

//CREAMOS VARIABLE PARA LA CANTIDAD DE NAVES DISPONIBLES
var navesDisponibles = 5


// CREAMOS A LOS ENEMIGOS
setInterval(() => {

    // OBTENEMOS LA CANTIDAD DE ENEMIGOS ACTUALES
    var enemigos = document.querySelectorAll(".enemigo")

    // VERIFICAMOS CUANTOS ENEMIGOS EXISTEN

    // SI HAY MENOS DE 5 ENEMIGOS, ENTONCES SEGUIREMOS CREANDO
    if (enemigos.length < navesDisponibles) {
        jugador.crearEnemigo(1,0)//CREAMOS NAVES SENCILLAS
    }


}, 1000); // 1 SEGUNDO


// VARIABLES DE CONTROL (PARA DETENER AL PERSONAJE)
var detenerDerecha = false
var detenerIzquierda = false

// ENEVENTO KEYDOWN (CUANDO SE PRECIONA UNA TECLA)
window.onkeydown = function (e) {
    sonidoFondo.play()

    // alert(e.which)
    // TECLA D = 68
    // TECLA A = 65
    // TECLA W = 87
    // TECLA ESPACIO = 32    
    // TECLA S = 83

    var tecla = e.which

    // COMPROBAMOS LA TECLA CON LA TECNICA CONDICIONAL
    if (tecla == 68 && detenerDerecha == false) {
        // EJECUTAMOS LA ACCION DE MOVER A LA DERECHA
        jugador.moverDerecha(player)

        // INIDICAMOS QUE SE ESTA MOVIENDO A LA DERECHA
        detenerDerecha = true
    }

    if (tecla == 65 && detenerIzquierda == false) {
        jugador.moverIzquierda(player)

        // INDICAMOS QUE SE ESTA MOVIENDO A LA IZQUIERDA
        detenerIzquierda = true
    }

    if (tecla == 32) {
        jugador.crearMunicion(player)
    }

}


// EVENTO KEYUP (CUANDO SOLTAMOS UNA TECLA)
window.onkeyup = function (e) {

    // CUANDO SOLTEMOS LA TECLA 68 (D) SE DETENDRA MOVER A LA DERECHA
    if (e.which == 68) {
        detenerDerecha = false
    }

    // CUANDO SOLTEMOS LA TECLA 65 (A) SE DETENDRA MOVER A LA IZQUIERDA
    if (e.which == 65) {
        detenerIzquierda = false
    }

}

// CREAMOS EL FONDO
var sonidoFondo = document.createElement("audio")
sonidoFondo.setAttribute("src", "sonidos/fondo.mp3")
sonidoFondo.loop
window.onclick = function () {
    sonidoFondo.play()
}