//establecer la conexion
var socket = io();

var barraParams = new URLSearchParams(window.location.search);

if (!barraParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritrio es necesario');
}

var escritorio = barraParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return
        }
        label.text('Ticket ' + resp.numero);

    });
})