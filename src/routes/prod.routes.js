import { Router } from 'express';
import { Archivo } from '../container/Archivo.js';
import { config } from '../utils/config.js';

const productsRouters = Router();
const productsApi = new Archivo('dbProductos.json');

const esAdmin = config.isAdmin;

function soloAdmins(req, res, next ) {
    if (!esAdmin) {
        res.estatus(403).json({code: 403, msg: `Error de acceso ${req.method} ${req.baseUrl}${req.url}`})
    } else {
        next();
    };
};

// Listado de productos 

productsRouters.get('/', async (req, res) => {
    const productos = await productsApi.listarAll();
    res.json(productos);
});

// buscar un producto 
productsRouters.get('/:id', async (req, res) => {
    res.json(await productsApi.listar(req.params.id))
});

// guardar productos - solo administradores 

productsRouters.post('/', soloAdmins, async (req, res) => {
    res.json({ id: await productsApi.guardar(req.body) })
});

// actualizar un producto - solo administradores

productsRouters.put('/', soloAdmins, async (req, res) => {
    res.json({id: await productsApi.actualizar(req.body, req.params.id)})
});

// borrar un producto - solo administradores

productsRouters.delete('/:id', soloAdmins, async (req, res) => {
    res.json( await productsApi.borrar(req.params.id))
})

export default productsRouters;











