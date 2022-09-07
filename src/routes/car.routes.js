


import { Router } from "express";
import { Archivo } from '../container/Archivo.js';


const carRouter = Router();
const carritosApi = new Archivo('dbCarritos.json');
const productsApi = new Archivo('dbProductos.js');

carRouter.get('/', async (req, res) =>{
    res.json((await carritosApi.listarAll()))
});

carRouter.post('/', async (req, res) =>{
    res.json({ id: await carritosApi.guardar({productos: [] }) });
});

carRouter.delete('/:id', async (req, res) => {
    res.json(await carritosApi.borrar(req.params.id))
});

carRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id);
    res.json(carrito.productos);
});

carRouter.post('/:id/productos', async (req, res) =>{
    const carrito = await carritosApi.listar(req.params.id);
    const producto = await productsApi.listar(req.body.id);
    carrito.productos.push(producto);
    await carritosApi.actualizar(carrito, req.params.id);
    res.end();

});

carRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id);
    const index  = carrito.productos.findIndex(p => p.id == req.params.idProd);

    if (index != -1) {
        carrito.productos.splice(index, 1);
        await carritosApi.actualizar(carrito, req.params.id);
    }
    res.end();
});

export default carRouter;