/*
 description Emulador de una terminal y varias máquinas en red usando Javascript
 author Julián Esteban Gutiérrez Posada y Carlos Eduardo Gómez Montoya
 email jugutier@uniquindio.edu.co carloseg@uniquindio.edu.co
 licence GNU General Public License  Ver. 3.0 (GNU GPL v3)
 date Octubre 2020
 version 1.1
 modificado por: Jhonny Sierra Parra, Juan Pablo Grisales, Miguel Medina
 */

/*
 * Datos precargados
 * Contienen los datos 
 */

 var entrada = document.getElementById( "entrada" );
 var textoLogin = document.getElementById( "login" );
 var prontLogin = document.getElementById( "prompt" );
 var divComandos = document.getElementById( "divComandos" );
 var permisosChmod = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];


 var maquinas = '{"maquinas":[' +
     '{"Nombre":"Cliente1","dirIP":"192.168.1.1" },' +
     '{"Nombre":"Cliente2","dirIP":"192.168.1.2" },' +
     '{"Nombre":"Cliente3","dirIP":"192.168.1.3" },' +
     '{"Nombre":"Cliente4","dirIP":"192.168.1.4" }]}'; 

 var sistema = '{'+
     '"maquinaActual": null,'+
     '"usuarioActual": null,'+
     '"maquinaAnterior": null,'+
     '"usuarioAnterior": null,'+
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
                    //document.getElementById( "prueba" ).innerHTML += objSistema.sistema[x].usuarios[y] + "("+ x + "," + y +")";
                    objSistema.maquinaActual = objSistema.sistema[x].nombre;
                    objSistema.usuarioActual = objSistema.sistema[x].usuarios[y];
                    busqueda = true;
                    break loop;
                }
            }
        }

        if (busqueda) {
            entrada.disabled = false;
            $('#divComandos').show();
            $('#loginDiv').hide();
            loginMensaje.innerHTML = "";
            textoLogin.value = "";

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
    //Valida si exista una sesion anterior
    if (objSistema.maquinaAnterior == null && objSistema.usuarioAnterior == null) {
        $('#loginDiv').show();
        objSistema.maquinaActual = null;
        objSistema.usuarioActual = null;
        limpiarDivComandos();
        $('#divComandos').hide();
        foco();
    } else {
        // Se actualizan los datos de maquina actual con los de la anterior
        objSistema.maquinaActual = objSistema.maquinaAnterior;
        objSistema.usuarioActual = objSistema.usuarioAnterior;

        objSistema.maquinaAnterior = null;
        objSistema.usuarioAnterior = null;

        // Se actualizan los datos mostrados en la consola
        entrada.disabled = false;
        $('#divComandos').show();
        $('#loginDiv').hide();
        loginMensaje.innerHTML = "";
        textoLogin.value = "";
        limpiarDivComandos();
        entrada.focus();
        prontLogin.innerHTML = objSistema.usuarioActual + "@"+ objSistema.maquinaActual + " $";
    }
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
    if ($('#loginDiv').is(":visible")) {
        textoLogin.focus();
    } else {
        entrada.focus();
    }   
}

/**
 * Consulta el indice de la maquina actual
 *
 * @param      {<type>}  maquina  The maquina
 * @return     {<type>}  { description_of_the_return_value }
 */
 function consultarIndiceMaquina(maquina) {
    for (x in objSistema.sistema) {
        if (objSistema.sistema[x].nombre == maquina) {
            return x;
            break;
        }
    }
    return null;
}

/**
 * Verifica si existe un archivo en el disco de la maquina
 *
 * @param      {String}   archivo  Nombre del archivo
 * @return     {boolean}  { description_of_the_return_value }
 */
 function buscarArchivo(archivo) {
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);

    for (x in objSistema.sistema[indiceMaquina].disco) {
        if (objSistema.sistema[indiceMaquina].disco[x].nombre == archivo) {
            return true;
        }
    }
    return false;
}

/**
 * Funcion para consultar el indice de un archivo en el arreglo de disco de la maquina
 *
 * @param      {<type>}  archivo  The archivo
 * @return     {<type>}  { description_of_the_return_value }
 */
 function consultarIndiceArchivo(archivo) {
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);

    for (x in objSistema.sistema[indiceMaquina].disco) {
        console.log(objSistema.sistema[indiceMaquina].disco[x]);
        if (objSistema.sistema[indiceMaquina].disco[x].nombre == archivo) {
            return x;
        }
    }
    return null;
}

/**
 * Funcion para consultar el indice de un usuarios en la maquina actual
 *
 * @param      {String}  usuario  The usuario
 * @return     {<type>}  { description_of_the_return_value }
 */
 function consultarIndiceUsuario(usuario) {
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);

    for (x in objSistema.sistema[indiceMaquina].usuarios) {
        if (objSistema.sistema[indiceMaquina].usuarios[x] == usuario) {
            return x;
            break;
        }
    }
    return null;
}

/**
 * Consulta el indice del grupo
 *
 * @param      {<type>}  grupo   The grupo
 * @return     {<type>}  { description_of_the_return_value }
 */
function consultarIndiceGrupo(grupo) {
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);

    for (x in objSistema.sistema[indiceMaquina].grupoNom) {
        if (objSistema.sistema[indiceMaquina].grupoNom[x] == grupo) {
            return x;
            break;
        }
    }
    return null;
}

function verificarPerteneceGrupo(indiceMaquina, usuario, grupo) {
    for (x in objSistema.sistema[indiceMaquina].grupos[grupo]) {
        if (objSistema.sistema[indiceMaquina].grupos[grupo][x] == usuario) {
            return true;
            break;
        }
    }
    return false;
}

function verificarPermisosLectura(indiceMaquina, indiceUsuario, grupo, permiso) {
    permisoGrupo = permiso.charAt(4);
    permisoOtros = permiso.charAt(7);

    if (verificarPerteneceGrupo(indiceMaquina, indiceUsuario, grupo)) {
        if (permisoGrupo == "r") {
            console.log("permisos por grupo");
            return true;
        }
        else{
            return false;
        }
    }

    if (permisoOtros == "r") {
        console.log("permisos por otros");
        return true;
    }

    return false;
}



/**
 * Verifica si un usuario tiene permisos de escritura sobre un archivo
 *
 * @param      {<type>}   indiceMaquina  The indice maquina
 * @param      {<type>}   indiceUsuario  The indice usuario
 * @param      {<type>}   grupo          The grupo
 * @param      {string}   permiso        The permiso
 * @return     {boolean}  { description_of_the_return_value }
 */
function verificarPermisosEscritura(indiceMaquina, indiceUsuario, grupo, permiso) {
    permisoGrupo = permiso.charAt(5);
    permisoOtros = permiso.charAt(8);

    if (verificarPerteneceGrupo(indiceMaquina, indiceUsuario, grupo)) {
        if (permisoGrupo == "w") {
            console.log("permisos por grupo");
            return true;
        }
        else{
            return false;
        }
    }

    if (permisoOtros == "w") {
        console.log("permisos por otros");
        return true;
    }

    return false;
}

function verificarPermisosEjecucion(indiceMaquina, indiceUsuario, grupo, permiso) {
    permisoGrupo = permiso.charAt(6);
    permisoOtros = permiso.charAt(9);

    if (verificarPerteneceGrupo(indiceMaquina, indiceUsuario, grupo)) {
        if (permisoGrupo == "x") {
            console.log("permisos por grupo");
            return true;
        }
        else{
            return false;
        }
    }

    if (permisoOtros == "x") {
        console.log("permisos por otros");
        return true;
    }

    return false;
}

/**
 * funcion que permite procesar el comando cat 
 *
 * @param      {string}  archivo  Nombre del archivo a leer
 */
function procesarCat(archivo) {
    var indiceUsuario = consultarIndiceUsuario(objSistema.usuarioActual);
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    var indiceArchivo = consultarIndiceArchivo(archivo);
    
    if (buscarArchivo(archivo)) {
        var propietario = objSistema.sistema[indiceMaquina].disco[indiceArchivo].propietario;
        var permiso = objSistema.sistema[indiceMaquina].disco[indiceArchivo].permiso;
        var grupo = objSistema.sistema[indiceMaquina].disco[indiceArchivo].grupo;

        if (propietario == indiceUsuario) {
            if (verificarPermisosUsuarioR(permiso)) {
                addConsola("cat: " + archivo + ": Leyendo el contenido del archivo...");
            } else {
                addConsola("cat: " + archivo + ": No tiene permiso para leer el archivo");
            }
        }else{
            if (verificarPermisosLectura(indiceMaquina, indiceUsuario, grupo, permiso)) {
                addConsola("cat: " + archivo + ": Leyendo el contenido del archivo...");  
            } else {
                addConsola("cat: " + archivo + ": No tiene permiso para leer el archivo");
            } 
        }
    } else {
     addConsola("cat: " + archivo + ": No existe el archivo o el directorio"); 
    }
}

/**
 * Verifica si un propietario tiene permisos de lectura
 *
 * @param      {string}   permiso  Permiso del archivo
 * @return     {boolean}  True si tiene permiso de lectura, false si no
 */
function verificarPermisosUsuarioR(permiso) {
    var permisoUsuario = permiso.charAt(1);
    if (permisoUsuario == "r") {
        return true;   
    }
    return false;
}

/**
 * Verifica si un propietario tiene permisos de escritura
 *
 * @param      {string}   permiso  Permiso del archivo
 * @return     {boolean}  True si tiene permiso de escritura, false si no
 */
function verificarPermisosUsuarioW(permiso) {
    var permisoUsuario = permiso.charAt(2);
    if (permisoUsuario == "w") {
        return true;   
    }
    return false;
}

/**
 * Verifica si un propietario tiene permisos de ejecucion
 *
 * @param      {string}   permiso  Permiso del archivo
 * @return     {boolean}  True si tiene permiso de escritura, false si no
 */
function verificarPermisosUsuarioX(permiso) {
    var permisoUsuario = permiso.charAt(3);
    if (permisoUsuario == "x") {
        return true;   
    }
    return false;
}

function procesarTouch(archivo) {
    var indiceUsuario = consultarIndiceUsuario(objSistema.usuarioActual);
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    var indiceArchivo = consultarIndiceArchivo(archivo);

    var longitudDisco = objSistema.sistema[indiceMaquina].disco.length;


    var fechaActual = new Date();
    var cadenaFecha = fechaActual.toString();
    var fechaArchivo = cadenaFecha.split(" ");

    if (!buscarArchivo(archivo)) {
        objSistema.sistema[indiceMaquina].disco.push({"permiso":"-rw-r-----", "propietario":indiceUsuario, "grupo":indiceUsuario,"fecha":"08-apr-2019", "nombre":archivo});
    } else {
        var propietario = objSistema.sistema[indiceMaquina].disco[indiceArchivo].propietario;
        var permiso = objSistema.sistema[indiceMaquina].disco[indiceArchivo].permiso;
        var grupo = objSistema.sistema[indiceMaquina].disco[indiceArchivo].grupo;

        if (propietario == indiceUsuario) {
            if (verificarPermisosUsuarioW(permiso)) {
                objSistema.sistema[indiceMaquina].disco[indiceArchivo].fecha = fechaArchivo[2] + "-" + fechaArchivo[1] + "-" + fechaArchivo[3];
            }else{
                addConsola("bash: touch: " + " El usuario no tiene permisos de escritura");
            }
        }else{
            if (verificarPermisosEscritura(indiceMaquina, indiceUsuario, grupo, permiso)) {
                objSistema.sistema[indiceMaquina].disco[indiceArchivo].fecha = fechaArchivo[2] + "-" + fechaArchivo[1] + "-" + fechaArchivo[3];
            }else{
                addConsola("bash: touch: " + " El usuario no tiene permisos de escritura");
            }
        }
    }    
}

/**
 * Funcion para cambiar los permisos del propietario y grupo
 *
 * @param      {<type>}  archivo           Nombre del archivo
 * @param      {<type>}  propietarioGrupo  Cadena con propietario:grupo
 */
function procesarChown(archivo, propietarioGrupo) {
    var indiceUsuario = consultarIndiceUsuario(propietarioGrupo[0]);
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    var indiceArchivo = consultarIndiceArchivo(archivo);
    var indiceGrupo = consultarIndiceGrupo(propietarioGrupo[1]);


    if (buscarArchivo(archivo)) {
        if (indiceUsuario != null) {
            if (indiceGrupo != null) {
                objSistema.sistema[indiceMaquina].disco[indiceArchivo].propietario = indiceUsuario;
                objSistema.sistema[indiceMaquina].disco[indiceArchivo].grupo = indiceGrupo;
                addConsola("bash: chown: " + " Se cambiaron los permisos");
            } else {
                addConsola("bash: chown: " + " El grupo no existe");
            }
        } else {
            addConsola("bash: chown: " + " El usuario no existe");
        }
    }else{
        addConsola("bash: chown: " + " El archivo no existe");
    }
}

/**
 * Funcion que permite procesar el comando chmod para cambiar los permisos de un archivo
 *
 * @param      {string}  permiso  Permiso en formato numerico
 * @param      {string}  archivo  Nombre del archivo
 */
function procesarChmod(permiso, archivo) {
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    var indiceArchivo = consultarIndiceArchivo(archivo);

    if (buscarArchivo(archivo)){
        objSistema.sistema[indiceMaquina].disco[indiceArchivo].permiso = "-" + permisosChmod[permiso.charAt(0)] + permisosChmod[permiso.charAt(1)] + permisosChmod[permiso.charAt(2)];
        addConsola("chmod: Se cambiaron los permisos del archivo " + archivo);
    }else{
        addConsola("bash: chmod: " + " El archivo no existe");
    }
}

/**
 * Funcion que permite procesar el comando ejecutar
 *
 * @param      {string}  archivo  The archivo
 */
function procesarEjecutar(archivo) {
    var indiceUsuario = consultarIndiceUsuario(objSistema.usuarioActual);
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    var indiceArchivo = consultarIndiceArchivo(archivo);
    var extensionArchivo = archivo.substring(archivo.length -3, archivo.length);

    if (buscarArchivo(archivo)) {
        if (extensionArchivo == ".sh") {
            var propietario = objSistema.sistema[indiceMaquina].disco[indiceArchivo].propietario;
            var permiso = objSistema.sistema[indiceMaquina].disco[indiceArchivo].permiso;
            var grupo = objSistema.sistema[indiceMaquina].disco[indiceArchivo].grupo;

            if (propietario == indiceUsuario) {
                if (verificarPermisosUsuarioX(permiso)) {
                    addConsola("bash: ./: " + " Ejecutando archivo" + archivo);
                }else{
                    addConsola("bash: ./: " + " El usuario no tiene permisos de ejecucion");
                }
            }else{
                if (verificarPermisosEjecucion(indiceMaquina, indiceUsuario, grupo, permiso)) {
                    addConsola("bash: ./: " + " Ejecutando archivo " + archivo);
                }else{
                    addConsola("bash: ./: " + " El usuario no tiene permisos de ejecucion");
                }
            } 
        } else {
            addConsola("bash: ./: " + archivo + ": El archivo no es ejecutable");
        }
    } else {
        addConsola("bash: " + archivo + ": El archivo no existe");
    }  
}


/**
 * Funcion para obtener el nombre de una maquina ingresando su IP
 *
 * @param      {<type>}  ipMaquina  Direccion IP de la maquina
 * @return     {<type>}  Nombre de la maquina
 */
function consultarNomMaquinaPorIP(ipMaquina) {
    for (x in objSistema.sistema) {
        if (objSistema.sistema[x].dirIP == ipMaquina) {
            return objSistema.sistema[x].nombre;
            break;
        }
    }
    return null;
}


/**
 * Funcion que permite saber si un usuario existe o no en una maquina del sistema
 *
 * @param      {<type>}   indiceMaquina  Indice de la maquina
 * @param      {<type>}   usuario        Nombre del usuario a buscar
 * @return     {boolean}  True si encuentra en usuario en la maquina, false si no
 */
function buscarUsuarioEnMaquina(indiceMaquina, usuario) {
    for (x in objSistema.sistema[indiceMaquina].usuarios) {
            if (objSistema.sistema[indiceMaquina].usuarios[x] == usuario) {
                return true;
            }
        }
    return false;
}

/**
 * Funcion que permite realizar una conexion ssh a otra maquina
 *
 * @param      {string}  usuario    Nombre del usuario con el que se quiere loguear en la maquina
 * @param      {string}  ipMaquina  Direccion IP de la maquina a la que se quiere conectar
 */
function procesarSsh(usuario, ipMaquina) {

    var nombreMaquina = consultarNomMaquinaPorIP(ipMaquina);

    if (nombreMaquina != null) {
        var indiceMaquina = consultarIndiceMaquina(nombreMaquina);
        if (buscarUsuarioEnMaquina(indiceMaquina, usuario)) {
            // Se guardan los datos de la maquina anterior
            objSistema.maquinaAnterior = objSistema.maquinaActual;
            objSistema.usuarioAnterior = objSistema.usuarioActual;

            // Se actualizan los datos de la maquina actual
            objSistema.maquinaActual = nombreMaquina;
            objSistema.usuarioActual = usuario;

            // Se actualiza en promt
            entrada.disabled = false;
            $('#divComandos').show();
            $('#loginDiv').hide();
            loginMensaje.innerHTML = "";
            textoLogin.value = "";

            entrada.focus();
            prontLogin.innerHTML = objSistema.usuarioActual + "@"+ objSistema.maquinaActual + " $";

        } else {
            addConsola("ssh: Permisos denegados para: " + usuario + "@"+ ipMaquina + ": Por favor intente de nuevo");
        }
    } else {
        addConsola("ssh: No se puede conectar al host: " + ipMaquina + ": No existe la ruta");
    }
}


function procesarScp(usuario, ipMaquina, archivo) {
    var nombreMaquina = consultarNomMaquinaPorIP(ipMaquina);

    if (nombreMaquina != null) {
        var indiceMaquina = consultarIndiceMaquina(nombreMaquina);

        if (buscarUsuarioEnMaquina(indiceMaquina, usuario)) {
            if (buscarArchivo(archivo)) {

                var permiso = objSistema.sistema[indiceMaquina].disco[indiceArchivo].permiso;
                
            } else {
                addConsola("scp: " + archivo + " : No existe el archivo o el directorio");
            }
            
                
        } else {
            addConsola("ssh: Permisos denegados para: " + usuario + "@"+ ipMaquina + ": Por favor intente de nuevo");
        }
    } else {
        addConsola("scp: No se puede conectar al host: " + ipMaquina + ": No existe la ruta");
    }
}

/**
 * Funcion que permite procesar comando ls
 */
 function procesarListar() {
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    
    for (x in objSistema.sistema[indiceMaquina].disco) {
        document.getElementById( "textoImprimir" ).innerHTML += objSistema.sistema[indiceMaquina].disco[x].nombre + "&emsp;&emsp;&emsp;";
    }
    document.getElementById( "textoImprimir" ).innerHTML += "<br>";
}

/**
 * Funcion que permite procesar el comando ls -l
 */
function procesarListarLs() {
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    
    for (x in objSistema.sistema[indiceMaquina].disco) {
        document.getElementById( "textoImprimir" ).innerHTML += objSistema.sistema[indiceMaquina].disco[x].permiso + "&emsp;&emsp;&emsp;"
        + objSistema.sistema[indiceMaquina].usuarios[objSistema.sistema[indiceMaquina].disco[x].propietario] + "&emsp;&emsp;&emsp;"
        + objSistema.sistema[indiceMaquina].grupoNom[objSistema.sistema[indiceMaquina].disco[x].grupo] + "&emsp;&emsp;&emsp;"
        + objSistema.sistema[indiceMaquina].disco[x].fecha + "&emsp;&emsp;&emsp;"
        + objSistema.sistema[indiceMaquina].disco[x].nombre + "<br>";
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

   addConsola (objSistema.usuarioActual + "@" + objSistema.maquinaActual + " $");

   comandoExe = comandoParametros[0].substring(0, 2);
   archivoExe = comandoParametros[0].substring(2, comandoParametros[0].length);

    if (comandoExe == './') {
        procesarEjecutar(archivoExe);
    }else{
       switch ( comandoParametros[0] ){
            case 'clear': 
                procesarClear( comandoParametros );
                break;

            case 'exit':
                cerrarSesion();
                break;

            case 'ls':
                if (comandoParametros[1] == '-l') {
                    procesarListarLs();
                }else if(comandoParametros[1] == null){
                    procesarListar();
                }else{
                    addConsola ( "bash: parametro no reconocido: " + comandoParametros[1] );
                }
                break;

            case 'cat':
                if (comandoParametros[1] != null) {
                    procesarCat(comandoParametros[1]);    
                }else{
                    addConsola ( "bash: El comando cat necesita un parametro" );
                }
                break;

            case 'touch':
                if (comandoParametros[1] != null) {
                    procesarTouch(comandoParametros[1]);    
                }else{
                    addConsola ( "bash: El comando touch necesita un parametro" );
                }
                break;
            
            case 'sudo':
                if (comandoParametros[1] != null) {
                    if (comandoParametros[1] == "chown") {
                        propietarioGrupo = comandoParametros[2].split(":");
                        if (propietarioGrupo[0]!='' && propietarioGrupo[1]!='') {
                            if (comandoParametros[3]!="") {
                                procesarChown(comandoParametros[3], propietarioGrupo);
                            }else{
                                addConsola ( "bash: El comando chown necesita parametros" );    
                            }

                        } else {
                            addConsola ( "bash: El comando chown necesita parametros" );
                        }
                    } else if(comandoParametros[1] == "chmod"){
                        if (isNaN(comandoParametros[2]) == false) {
                            if (comandoParametros[2].length==3) {
                                procesarChmod(comandoParametros[2], comandoParametros[3]);
                            } else {
                                addConsola ( "bash: chmod: El permiso no es válido" );
                            }
                        } else {
                            addConsola ( "bash: chmod: Se necesita números como parametro" );
                        }
                    }
                }else{
                    addConsola ( "bash: El comando sudo necesita parametros" );
                }
                break;

            case 'nano':
                if (comandoParametros[1] != null) {
                    procesarNano(comandoParametros[1]);    
                }else{
                    addConsola ( "bash: El comando nano necesita un parametro" );
                }
                break;

            case 'rm':
                if (comandoParametros[1] != null) {
                    procesarRm(comandoParametros[1]);    
                }else{
                    addConsola ( "bash: El comando rm necesita un parametro" );
                }
                break;

            case 'ssh':
                datosMaquinaSsh = comandoParametros[1].split("@");
                if (datosMaquinaSsh.length == 2) {
                    procesarSsh(datosMaquinaSsh[0], datosMaquinaSsh[1]);
                } else {
                    addConsola ( "ssh: Faltan algunos parametros: " + datosMaquinaSsh );
                }
                break;

            default:
                addConsola ( "bash: comando no reconocido: " + comandoParametros[0] );
        }
    }


    //addConsola ( "" );
    document.getElementById( "entrada" ).value = "";
}

function procesarNano (archivo) {

    var indiceUsuario = consultarIndiceUsuario(objSistema.usuarioActual);
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    var indiceArchivo = consultarIndiceArchivo(archivo);

    if (buscarArchivo(archivo)) {
        var propietario = objSistema.sistema[indiceMaquina].disco[indiceArchivo].propietario;
        var permiso = objSistema.sistema[indiceMaquina].disco[indiceArchivo].permiso;
        var grupo = objSistema.sistema[indiceMaquina].disco[indiceArchivo].grupo;

        if (propietario == indiceUsuario) {
            if (verificarPermisosUsuarioW(permiso)) {
                addConsola("nano: Escribiendo el archivo " + archivo + " ...");
            } else {
                addConsola("nano: No tiene permisos para escribir el archivo " + archivo );
            }
        }else{
            if (verificarPermisosEscritura(indiceMaquina, indiceUsuario, grupo, permiso)) {
                addConsola("nano: Escribiendo el archivo " + archivo + " ...");  
            } else {
                addConsola("nano: No tiene permiso para escribir el archivo " + archivo);
            } 
        }

    } else {
     addConsola("nano: El archivo " + archivo + " no existe"); 
    }
}

/**
 * Metodo para procesar la eliminacion de archivos con rm
 * @param {} archivo 
 */
function procesarRm (archivo) {

    var indiceUsuario = consultarIndiceUsuario(objSistema.usuarioActual);
    var indiceMaquina = consultarIndiceMaquina(objSistema.maquinaActual);
    var indiceArchivo = consultarIndiceArchivo(archivo);

    if (buscarArchivo(archivo)) {
        var propietario = objSistema.sistema[indiceMaquina].disco[indiceArchivo].propietario;
        var permiso = objSistema.sistema[indiceMaquina].disco[indiceArchivo].permiso;
        var grupo = objSistema.sistema[indiceMaquina].disco[indiceArchivo].grupo;

        if (propietario == indiceUsuario) {
            if (verificarPermisosUsuarioW(permiso)) {
                objSistema.sistema[indiceMaquina].disco.splice(indiceArchivo, 1);
                addConsola("rm: Se removio el archivo  " + archivo);
            } else {
                addConsola("rm: No tiene permisos para escribir el archivo " + archivo );
            }
        }else{
            if (verificarPermisosEscritura(indiceMaquina, indiceUsuario, grupo, permiso)) {
                objSistema.sistema[indiceMaquina].disco.splice(indiceArchivo, 1);
                addConsola("rm: Se removio el archivo " + archivo);  
            } else {
                addConsola("rm: No tiene permiso para escribir el archivo " + archivo);
            } 
        }

    } else {
     addConsola("rm: El archivo " + archivo + " no existe"); 
    }
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

