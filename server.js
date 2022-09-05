const express = require('express');

// Instancia
const app = express();

// Middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));



//Servidor
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto http:://localhost:${server.address().port}`)
});
server.on('error', err => console.log(`error en server ${err}`));