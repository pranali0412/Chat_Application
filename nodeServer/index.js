// const io = require('socket.io')(8000);
//Node Server 
const io = require("socket.io")(8000,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

const users = {};

io.on('connect', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //logo ko pta chlagea user join hua hai
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})