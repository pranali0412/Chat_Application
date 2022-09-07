const io = require('socket.io')(8000);
// const io = require("socket.io")(8000, {
//     cors: {
//     origin: "https://example.com",
//     methods: ["GET", "POST"]
//     }
//     });

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name); //logo ko pta chlagea user join hua hai
    });
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: user[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id] )
        delete users[socket.id];
    });
})