const chat=require ('./models/chat')
module.exports= function(io){
    let users={};
    //** */ usuarios cinectados
    io.on('connection',async socket=>{
        console.log('nuevo usuario');
        //buscar msg en bd
        let messages=await chat.find({}).limit(8);

        // emitirlos en un new event
        socket.emit('load old mesg',messages);

        // ** escuchando evnt
        socket.on('new user',(data,cb)=>{
            console.log(data)
            if(data in users){
                cb(false)
            }else{
                cb(true);
                socket.nickname=data;
                // users.push(socket.nickname);
                users[socket.nickname]=socket;
                updateNicknames()
            }
        });
        socket.on('send message',async function(data,cb){
            console.log(data)
            var msg=data.trim();
            if(msg.substr(0,3)=== '/w '){
                msg= msg.substr(3);
                const index=msg.indexOf(' ')
                if(index !== -1){
                   var name= msg.substring(0,index);
                   var msg=msg.substring(index+1)
                   if(name in users){
                       users[name].emit('whisper',{
                           msg,
                           nick: socket.nickname
                       })
                   }else{
                        cb('Erorr por favor ingresa un usario valido!')
                   }
                }else{
                    cb('Error por favor ingresa tu mensaje')
                }
            }else{
                var newMsg= new chat({
                    msg,
                    nick:socket.nickname
                });
                await newMsg.save();
                io.sockets.emit('new message', {
                    msg:data,
                    nick:socket.nickname
                });
            }
          
        })

        socket.on('disconnect', data=>{
            if(!socket.nickname) return;
            // nicknames.splice(nicknames.indexOf(socket.nickname),1);
            delete users[socket.nickname];
            updateNicknames()
        })

        function updateNicknames (){
            io.sockets.emit('usernames',Object.keys(users))

        }
    });
}