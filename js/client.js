const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

const name = prompt("enter Your name");
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name} joined chat`, 'left')
})
socket.on('leave', name => {
    append(`${name} left chat`, 'right')
})
