module.exports= function(io){
    io.on('connection',socket=>{
        console.log('nuevo usuario')

        // ** escuchando evnt
        socket.on('send message',function(data){
            console.log(data)
        })
    });
}