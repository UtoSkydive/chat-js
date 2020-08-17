module.exports= function(io){
    let nicknames=[];
    //** */ usuarios cinectados
    io.on('connection',socket=>{
        console.log('nuevo usuario');

        // ** escuchando evnt
        socket.on('new user',(data,cb)=>{
            console.log(data)
            if(nicknames.indexOf(data) != -1){
                cb(false)
            }else{
                cb(true);
                socket.nickname=data;
                nicknames.push(socket.nickname);
                updateNicknames()
            }
        });
        socket.on('send message',function(data){
            console.log(data)
            io.sockets.emit('new message', {
                msg:data,
                nick:socket.nickname
            });
        })

        socket.on('disconnect', data=>{
            if(!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname),1);
            updateNicknames()
        })

        function updateNicknames (){
            io.sockets.emit('usernames',nicknames)

        }
    });
}