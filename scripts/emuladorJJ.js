/*
 description Emulador de una terminal y varias máquinas en red usando Javascript
 author Julián Esteban Gutiérrez Posada y Carlos Eduardo Gómez Montoya
 email jugutier@uniquindio.edu.co carloseg@uniquindio.edu.co
 licence GNU General Public License  Ver. 3.0 (GNU GPL v3)
 date Octubre 2020
 version 1.1
 modificado por: Jhonny Sierra Parra, Juan Pablo Grisales
*/

/*
 * Datos precargados
 * Contienen los datos 
 */

var entrada = document.getElementById( "entrada" );
var textoLogin = document.getElementById( "login" );
var prontLogin = document.getElementById( "prompt" );
var divComandos = document.getElementById( "divComandos" );



var maquinas = '{"maquinas":[' +
    '{"Nombre":"Cliente1","dirIP":"192.168.1.1" },' +
    '{"Nombre":"Cliente2","dirIP":"192.168.1.2" },' +
    '{"Nombre":"Cliente3","dirIP":"192.168.1.3" },' +
    '{"Nombre":"Cliente4","dirIP":"192.168.1.4" }]}';

    var sistema = '{'+
    '"maquinaActual": null,'+
    '"usuarioActual": null,'+
    '"sistema":[' +
    '{'+
        '"nombre":"Cliente1",'+
        '"dirIP":"192.168.1.1",'+
        '"usuarios":["root","jhonny","pablo","juan","daniel"],'+
        /* Grupos: "root","jhonny","pablo","juan","daniel","amigos","trabajo" */
        '"grupoNom":["root","jhonny","pablo","juan","daniel","amigos","trabajo"],'+
        '"grupos":[["0"],["1"],["2"],["3"],["4"],["0","1","2"],["0","3","4"]],'+
        '"disco":[{"permiso":"-rw-r-----", "propietario":1, "grupo":1,"fecha":"18-oct-2020", "nombre":"carta.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":2, "grupo":2,"fecha":"17-oct-2020", "nombre":"documento.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":3, "grupo":3,"fecha":"08-oct-2020", "nombre":"horario.pdf"},'+
                 '{"permiso":"-rw-r-----", "propietario":4, "grupo":5,"fecha":"08-apr-2019", "nombre":"compilar.sh"}'+
                ']'+
    '},'+

    '{'+
        '"nombre":"Cliente2",'+
        '"dirIP":"192.168.1.2",'+
        '"usuarios":["root","jhonny","pablo","andres","maria"],'+
        /* Grupos: "root","jhonny","pablo","juan","daniel","amigos","trabajo" */
        '"grupoNom":["root","jhonny","pablo","andres","maria","amigos","trabajo"],'+
        '"grupos":[["0"],["1"],["2"],["3"],["4"],["0","1","2"],["0","3","4"]],'+
        '"disco":[{"permiso":"-rw-r-----", "propietario":1, "grupo":1,"fecha":"27-jan-2020", "nombre":"carta2.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":2, "grupo":2,"fecha":"17-feb-2020", "nombre":"documento2.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":3, "grupo":3,"fecha":"30-mar-2020", "nombre":"horario2.pdf"},'+
                 '{"permiso":"-rw-r-----", "propietario":4, "grupo":6,"fecha":"29-jul-2019", "nombre":"compilar2.sh"}'+
                ']'+
    '},'+

    '{'+
        '"nombre":"Cliente3",'+
        '"dirIP":"192.168.1.3",'+
        '"usuarios":["root","jhonny","pablo","camilo","miguel"],'+
        /* Grupos: "root","jhonny","pablo","juan","daniel","amigos","trabajo" */
        '"grupoNom":["root","jhonny","pablo","camilo","miguel","amigos","trabajo"],'+
        '"grupos":[["0"],["1"],["2"],["3"],["4"],["0","1","2"],["0","3","4"]],'+
        '"disco":[{"permiso":"-rw-r-----", "propietario":1, "grupo":1,"fecha":"27-jun-2018", "nombre":"carta3.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":2, "grupo":2,"fecha":"03-feb-2018", "nombre":"documento3.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":3, "grupo":3,"fecha":"07-dic-2019", "nombre":"horario3.pdf"},'+
                 '{"permiso":"-rw-r-----", "propietario":4, "grupo":5,"fecha":"29-aug-2019", "nombre":"compilar3.sh"}'+
                ']'+
    '},'+

    '{'+
        '"nombre":"Cliente4",'+
        '"dirIP":"192.168.1.4",'+
        '"usuarios":["root","jhonny","pablo","nestor","carlos"],'+
        /* Grupos: "root","jhonny","pablo","juan","daniel","amigos","trabajo" */
        '"grupoNom":["root","jhonny","pablo","nestor","carlos","amigos","trabajo"],'+
        '"grupos":[["0"],["1"],["2"],["3"],["4"],["0","1","2"],["0","3","4"]],'+
        '"disco":[{"permiso":"-rw-r-----", "propietario":1, "grupo":1,"fecha":"05-mar-2010", "nombre":"carta4.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":2, "grupo":2,"fecha":"03-feb-2009", "nombre":"documento4.txt"},'+
                 '{"permiso":"-rw-r-----", "propietario":3, "grupo":3,"fecha":"07-dic-2020", "nombre":"horario4.pdf"},'+
                 '{"permiso":"-rw-r-----", "propietario":4, "grupo":6,"fecha":"29-aug-2016", "nombre":"compilar4.sh"}'+
                ']'+
    '}'+

    ']}'; 

    var objMaquinas = JSON.parse(maquinas);
    var objSistema = JSON.parse(sistema);

$(document).ready(function(){
    entrada.disabled = true;

    var x = 1;
    for (i in objMaquinas.maquinas) {
        document.getElementById( "maquinas" ).innerHTML += "Maquina " + x + ": (" 
        + objMaquinas.maquinas[i].Nombre + "-" 
        + objMaquinas.maquinas[i].dirIP + "); ";
        x++;
    }

/*    
    for (x in objMaquinas.maquinas) {
        for (j in objMaquinas.maquinas[x]) {
            document.getElementById( "prueba" ).innerHTML += objMaquinas.maquinas[x][j];  
        }
      
    }
*/

    for (x in objSistema.sistema) {
        for (j in objSistema.sistema[x].disco) {
            for (k in objSistema.sistema[x].disco[j]) {
                document.getElementById( "prueba" ).innerHTML += objSistema.sistema[x].disco[j][k] + ",";
            }
        }
    }

/*

    var consulta = objSistema.sistema[0].grupos[5];
    if (consulta.includes('1')) {
        alert('El grupo tiene el usuario: ' + objSistema.sistema[0].usuarios[1]);
    }
*/
    //alert(objSistema.maquinaActual);
    
    /*var nombreLlave = Object.keys(objUsuarios.usuarios[0])[0];
  
    for (j in objUsuarios.usuarios) {
        document
        .getElementById( "prueba" ).innerHTML += "<h5> Usuarios M" + j + ":</h5> "; 
        //nombreLlave = Object.keys(objUsuarios.usuarios[j]);
        for (k in objUsuarios.usuarios[j]) {
            document.getElementById( "prueba" ).innerHTML += objUsuarios.usuarios[j][k].Nombre + "<br>"; 
        }
    }*/

});

/**
 * Valida que un usuario exista
 */
function login(e) {
    var busqueda = false;
    if (e.keyCode == 13) {
        textoLogin = document.getElementById( "login" );
        loginMensaje = document.getElementById( "spanLoginMensaje" );
        loginDiv = document.getElementById( "loginDiv" );

        loop:
        for (x in objSistema.sistema) {
            for (y in objSistema.sistema[x].usuarios) {
                if (textoLogin.value == objSistema.sistema[x].usuarios[y]) {
                    document.getElementById( "prueba" ).innerHTML += objSistema.sistema[x].usuarios[y] + "("+ x + "," + y +")";
                    objSistema.maquinaActual = objSistema.sistema[x].nombre;
                    objSistema.usuarioActual = objSistema.sistema[x].usuarios[y];
                    busqueda = true;
                    break loop;
                }
            }
        }

        if (busqueda) {
            entrada.disabled = false;

            $('#loginDiv').hide();
            loginMensaje.innerHTML = "";
            textoLogin.value = "";
            //loginDiv.style.display = 'none';

            entrada.focus();
            prontLogin.innerHTML = objSistema.usuarioActual + "@"+ objSistema.maquinaActual + " $";

        } else {
            textoLogin.value = "";
            loginMensaje.innerHTML = "El usuario no se encuentra en ninguna máquina";

        }
    }
}

/**
 * Funcion que permite cerrar la sesion
 */
function cerrarSesion() {
    $('#loginDiv').show();
    objSistema.maquinaActual = null;
    objSistema.usuarioActual = null;
    limpiarDivComandos();
    $('#divComandos').hide();
    foco();
}

/**
 * Limpiar div comando
 */
function limpiarDivComandos() {
    prontLogin.innerHTML = "";
    limpiarConsola();
}

/**
 * Borra (limpia) todo el contenido de la consola (ver HTML)
 */
function limpiarConsola() {
  document.getElementById( "textoImprimir" ).innerHTML = ""
  document.getElementById( "entrada" ).value           = "";
  //alert(objMaquinas.maquinas[1].Nombre + " " + objMaquinas.maquinas[1].dirIP);
}

/**
 * Adiciona una texto a la consola de la GUI (Ver HTML)
 * @param texto Texto que se desea adicionar al final de la consola.
 */
function addConsola ( texto ) {
  document.getElementById( "textoImprimir" ).innerHTML += texto + "<br>";
}


/**
 * Proceso de inicio de la terminal
 */
function foco()
{
    if (!loginDiv.disabled) {
        textoLogin.focus();
    } else {
        entrada.focus();
    }
    
}


/**
 * Procesa el evento de teclado. Enter (13) procesa la orden y ESC (27) imprime el JSON
 */
function procesarEntrada( e ) {
	if (e.keyCode == 13) {
		procesarComando ( document.getElementById( "entrada" ) );
	}	
}

/**
 * Procesa el comando enviado como argumento.
 * @param comando a procesar
 */
function procesarComando ( comando ) {
	var comandoParametros = comando.value.split(" ");

	//addConsola ( "carloseg@ventas$ " );

    switch ( comandoParametros[0] ){
        case 'clear': 
            procesarClear( comandoParametros );
            break;

        case 'logout':
            cerrarSesion();
            break;
        // ...

        default:
            addConsola ( "bash: comando no reconocido: " + comandoParametros[0] );
    }

    //addConsola ( "" );
    document.getElementById( "entrada" ).value = "";
}

/**
 * Procesa el comando (clear)
 */
function procesarClear ( comandoParametros ) {
    if ( comandoParametros.length > 1 ) {
        addConsola ( "clear: No requiere parámetros." )
    } else {
        limpiarConsola();
    }
}

