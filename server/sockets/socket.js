const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguinte();

        console.log(siguiente);
        callback(siguiente);

    });

    client.emit('estadoActual', {
        data: ticketControl.ultimoTicket(),
        ultimos4: ticketControl.ultimos4Tickets()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'No hay escritorio'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar|cambio en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.ultimos4Tickets()
        });

    });
});