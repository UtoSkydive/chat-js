const http=require('http');
const express=require('express');
const path=require('path');
// !Modulo socket permite conexion en time real.. npm install socket.io
const socketio=require('socket.io');
const { notStrictEqual } = require('assert');

const app=express();
const servidor=http.createServer(app);
const io=socketio.listen(servidor);


//setings usa el puerto q me de si no el 3000
app.set('port',process.env.PORT || 3000);
//conexion sockets
// io.on('connection',socket=>{
//     console.log('nuevo usuario')
// });

require('./sockets')(io)

//!static files archivos q no cambian
// app.use(express.static('public'));
// se usa path ya q la ruta principal cambio
// app.use(express.static(''));

// diretorios
// console.log(__dirname+'\public')
// los une sin / depende de el so
// console.log(path.join(__dirname,'public'));

app.use(express.static(path.join(__dirname,'public')));
// app.listen(3000,()=>{
//     console.log('server on port 3000')
// });
//!emeozando server
servidor.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'))
});


// notas
// npm install nodemon -D se einstala para no rencir el serv y d es desarollo
// npm run dev asi se ejecuta