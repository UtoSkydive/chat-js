// console.log('chat va aqui')

$(function(){
    
    const socket=io();

    // obteniendo los elementos de el DOM desde interfaz
    const $mesaggeForm=$('#message-form');
    const $mesaggeBox=$('#message');
    const $chat=$('#chat');

    //eventos
    $mesaggeForm.submit(e=>{
        e.preventDefault();
        console.log('enviando datos')
        console.log($mesaggeBox.val())
        //frontend envia a servidor lo de la caja y els ervidor debe escuchar en sockets **
        socket.emit('send message', $mesaggeBox.val());
        $mesaggeBox.val('')
    })

})