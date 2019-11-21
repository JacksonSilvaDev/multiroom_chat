var app = require('./config/server')

var server = app.listen(80, () => {
    console.log('Servidor online')
})

var io = require('socket.io').listen(server);

app.set('io', io)

io.on('connection', socket => {
    console.log('Usuario conectou')

    socket.on('disconnect', () => {
        console.log('Usuario desconectou')
    })

    socket.on('novaMensagem', (data) => {
        socket.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        })

        socket.broadcast.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        })
    })
});