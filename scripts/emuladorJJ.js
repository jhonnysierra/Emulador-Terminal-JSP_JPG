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
$(document).ready(function(){
  var maquinas = '{"maquinas":[' +
    '{"Nombre":"Cliente1","dirIP":"192.168.1.1" },' +
    '{"Nombre":"Cliente2","dirIP":"192.168.1.2" },' +
    '{"Nombre":"Cliente3","dirIP":"192.168.1.3" },' +
    '{"Nombre":"Cliente4","dirIP":"192.168.1.4" }]}';

    var sistema = '{"sistema":[' +
    '{"nombre":"Cliente1",'+
    '"dirIP":"192.168.1.1",'+
    '"usuarios":["root","jhonny","pablo","juan","daniel"],'+
    /* Grupos: "root","jhonny","pablo","juan","daniel","amigos","trabajo" */
    '"usuarios":["root","jhonny","pablo","juan","daniel","amigos","trabajo"],'+
    '"grupos":[["0"],["1"],["2"],["3"],["4"],["0","1","2"],["0","3","4"]],'+
    '"archivos":[["documeto.txt"],["Carta.txt", "Horario.txt", "ejecutable.sh"],[],[],[],[],[]]'+
    '}'+
    ']}'; 



    var objMaquinas = JSON.parse(maquinas);
    var objSistema = JSON.parse(sistema);
    

    var x = 1;
    for (i in objMaquinas.maquinas) {
        document.getElementById( "maquinas" ).innerHTML += "Maquina " + x + ": (" 
        + objMaquinas.maquinas[i].Nombre + "-" 
        + objMaquinas.maquinas[i].dirIP + "); ";
        x++;
    }


    addConsola(objSistema.sistema[0].archivos[0]);
/*
    var consulta = objSistema.sistema[0].grupos[5];
    if (consulta.includes('1')) {
        alert('El grupo tiene el usuario: ' + objSistema.sistema[0].usuarios[1]);
    }
*/
    alert(objSistema.sistema[0].grupos[5]);
    
    /*var nombreLlave = Object.keys(objUsuarios.usuarios[0])[0];
  
    for (j in objUsuarios.usuarios) {
        document.getElementById( "prueba" ).innerHTML += "<h5> Usuarios M" + j + ":</h5> "; 
        //nombreLlave = Object.keys(objUsuarios.usuarios[j]);
        for (k in objUsuarios.usuarios[j]) {
            document.getElementById( "prueba" ).innerHTML += objUsuarios.usuarios[j][k].Nombre + "<br>"; 
        }
    }*/

});

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
    entrada.focus();
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

	addConsola ( "carloseg@ventas$ " );

    switch ( comandoParametros[0] ){
        case 'clear': 
            procesarClear( comandoParametros );
            break;


        // ...

        default:
            addConsola ( "uqsh: comando no reconocido: " + comandoParametros[0] );
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

