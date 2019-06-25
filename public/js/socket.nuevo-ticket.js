//comando para la conexion
var socket = io();

var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Respuesta del Servidor: usuario conectado');

    socket.on('disconnect', function() {
        console.log('Respuesta del Servidor: usuario desconectado');

    });
});
socket.on('estadoActual', function(resp) {
    console.log(resp);

    label.text(resp.data);

});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(sigTicket) {
        label.text(sigTicket)
    });
});