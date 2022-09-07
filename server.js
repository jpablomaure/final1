import express from 'express';

import carRouter from './src/routes/car.routes.js';
import productsRouters from './src/routes/prod.routes.js';


// Instancia
const app = express();

// Middlewares
app.use(express.static('./public'));
app.use(express.json());

app.use('api/carrito', carRouter);
app.use('api/productos', productsRouters);

//Servidor
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto http:://localhost:${server.address().port}`)
});

server.on('error', err => console.log(`Error en server ${err}`));