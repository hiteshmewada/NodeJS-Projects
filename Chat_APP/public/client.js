const socket  = io()

let nam;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area')
do{
    nam=prompt('Please enter your generous name : ')
} while(!nam)

textArea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage (msg){
    let message = {
        user : nam,
        msg : msg.trim()
    }
    // APpend

    appendMessage(message , 'outgoing')
    textArea.value = ''
    scrollToBottom();

    // Send to server
    socket.emit('message',message);
}

function appendMessage(msg , type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className , 'message')

    let markup = `
        
        <h4>${msg.user}</h4>
        <p>${msg.msg}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}

// Receive Messages

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})