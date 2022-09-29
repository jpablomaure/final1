import express from 'express';

const { Router } = express;

import carRouter from './src/routes/car.routes.js';
import productsRouters from './src/routes/prod.routes.js';

import { 
    productosDao as productosApi,
    carritosDao as carritosApi
} from './src/daos/index.js';


const isAdmin = true;

// Instancia
const app = express();

// Middlewares
app.use(express.static('./public'));
app.use(express.json());

app.use('api/carrito', carRouter);
app.use('api/productos', productsRouters);

// routers de productos 

const productsRouters = new Router();

productsRouters.get('/', async (req, res) =>{
    const productos = await productosApi.listarAll();
    res.json(productos);
});

productsRouters.post('/', isAdmin, async (req, res) => {
    res.json(await productosApi.guardar(req.body));
});

productsRouters.put('/:id', isAdmin, async (req, res) => {
    res.json(await productosApi.actualizar(req.body))
});

productsRouters.delete('/:id', isAdmin, async (req, res) => {
    res.json(await productosApi.borrar(req.params.id))
});


const carritosRouter = new Router();

carritosRouter.get('/', async (req, res) => {
    res.json(await carritosApi.listarAll()).map(o => o.id)
});

carritosRouter.post('/', isAdmin, async (req, res) => {
    res.json(await carritosApi.guardar(req.body));
});

carritosRouter.delete('/:id', isAdmin, async (req, res) => {
    res.json(await carritosApi.borrar(req.params.id))
});

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id);
    res.json(carrito.productos);
});

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id);
    const productos = await productosApi.listar(req.body.id);
    carrito.productos.push(producto);
    await carritosApi.actualizar(carrito);
    res.end();
})

//Servidor
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto http:://localhost:${server.address().port}`)
});

server.on('error', err => console.log(`Error en server ${err}`));