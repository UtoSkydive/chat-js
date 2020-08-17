// console.log('chat va aqui')

$(function(){
    
    const socket=io();

    // !obteniendo los elementos de el DOM desde interfaz
    const $mesaggeForm=$('#message-form');
    const $mesaggeBox=$('#message');
    const $chat=$('#chat');
    // !obteniendo los elementos de el DOM desde nicknameform
    const $nickForm= $('#nickForm');
    const $nickError= $('#nickError');
    const $nickName= $('#nickName');

    // !obteniendo los elementos de el DOM desde users
    const $users=$('#username');

    // !eventos nickform
    $nickForm.submit(e=>{
        e.preventDefault()
        console.log('enviando..');
        socket.emit('new user',$nickName.val(),function (data){
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();

            }else{
                $nickError.html(`<div class="alert alert-danger">
                    Ese usaurio ya existe
                </div>`);
            }
            $nickName.val('')
        });
    });

    //!eventos app
    $mesaggeForm.submit(e=>{
        e.preventDefault();
        console.log('enviando datos')
        console.log($mesaggeBox.val())
        //!frontend envia a servidor lo de la caja y els ervidor debe escuchar en sockets **
        socket.emit('send message', $mesaggeBox.val());
        $mesaggeBox.val('')
    });

    socket.on('new message',function (data){
        $chat.append('<b>'+ data.nick+'</b>:'+ data.msg+ '</br>')
    })

    socket.on('usernames',data=>{
        let html='';
        for (let i=0; i< data.length;i++){
            html+=`<p><i class="fas fa-user"></i>${data[i]}</p>`
        }
        $users.html(html);
    })

})