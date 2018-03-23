var app = app; // HACK
// CONTROLES DE INICIO DEL JUEGO (no more continue button)
var botonDeComenzar = $('#start-button');
// Girl button
var createGirl = $('#chica');
// Boy button
var createBoy = $('#chico');

var modal = $('#modal');


// not sure what app is. makes app's PlayerName whatever the input was (missing). hides the modal. initiates?? app.
iniciarJuegoboy = function () {
    app.estado.playerName = $('#input-nombre').val();
    modal.modal('hide');
    app.__init('chico');
};

iniciarJuegogirl = function () {
    app.estado.playerName = $('#input-nombre').val();
    modal.modal('hide');
    app.__init('chica');
};

abrirModalDeInicio = function () {
    modal.modal('show');
};



//The continue button, not anymore.
botonDeComenzar.on('click', abrirModalDeInicio);
//if you click the girl button, starts iniciarJuego
createGirl.on('click', iniciarJuegogirl);
//if you click the boy button, starts iniciarJuego
createBoy.on('click', iniciarJuegoboy);

// CONTROLES DE DRAG AND DROP
allowDrop = function (ev) {
    ev.preventDefault();
};

dragPieza = function (ev) {
    ev.dataTransfer.setData("object", $(this).data("object"));
};

dropAvatar = function (ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("object"));
    if (app.estado.avatar[data.tipo].puesta === true) {
        var idImagenPuesta = app.estado.avatar[data.tipo].object.id;
        var imagenPuesta = document.getElementById(idImagenPuesta);
        imagenPuesta.setAttribute('id', data.id);
        imagenPuesta.setAttribute('src', data.src);
    } else {
        var imagen = factoryImagen(data);
        $(ev.target.parentNode).prepend(imagen);
    }
    app.estado.avatar[data.tipo] = {object: data, puesta: true};
};

factoryImagen = function (data) {
    var imagen = document.createElement('img');
    $(imagen).prop('tipo', data.tipo);
    imagen.src = data.src;
    imagen.setAttribute('id', data.id);
    $(imagen).addClass('avatar');
    return imagen;
};

// CONTROLES DE CAMBIAR PIEL
var botonesDeSeleccionDePiel = $('.piel');


//change the skin
cambiarPiel = function () {

    var self = this; // HACK

// Returns the skin as a string.
    getNumeroDePielSeleccionadaByClassName = function () {
        return self.className.split("piel__suntan-")[1].split(" ")[0];
    };

// CABEZA means HEAD. Returns the head + gender + skin string.
    factoryIdCabeza = function (genero, numeroPiel) {
        return "cabeza-" + genero + "-" + numeroPiel;
    };

    getSrcImagenCabezaByNumeroPiel = function (numeroPiel) {
        var cabezaDelAvatar = $('.avatar__cabeza');
        var srcCabezaEnAvatar = cabezaDelAvatar.attr('src');
        var pathDeImagenes = srcCabezaEnAvatar.split("cabeza-" + app.estado.genero + "-")[0];
		//number skin - path, e.g. cabeza-chica-2.png
        var archivoImagenCabeza = "cabeza-" + app.estado.genero + "-" + numeroPiel + ".png";
        var newSrcCabeza = pathDeImagenes + archivoImagenCabeza;
        return newSrcCabeza;
    };

    getBotonPielByNumeroPiel = function (numeroPiel) {
        return $('.piel__suntan-' + numeroPiel);
    };

    var cabezaDelAvatar = $('.avatar__cabeza');
    var pielSeleccionada = getNumeroDePielSeleccionadaByClassName();
    var botonDePielSeleccionada = getBotonPielByNumeroPiel(pielSeleccionada);
    botonesDeSeleccionDePiel.removeClass('piel--active');
    botonDePielSeleccionada.addClass('piel--active');
    var newSrcCabeza = getSrcImagenCabezaByNumeroPiel(pielSeleccionada);
    var nuevaCabeza = new Pieza(true,
            factoryIdCabeza(app.estado.genero, pielSeleccionada),
            newSrcCabeza,
            "cabeza");
    app.estado.avatar.cabeza = nuevaCabeza;
    cabezaDelAvatar.prop('src', nuevaCabeza.object.src);
};

botonesDeSeleccionDePiel.on('click', cambiarPiel);


