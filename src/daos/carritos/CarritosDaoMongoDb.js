import MongoDb from './src/container/MongoDb.js';

class CarritosDaoMongoDb extends MongoDb {

    constructor() {
        super('carritos', {
            productos: {type: [], required: true }
        })
    }
    async guardar(carrito = {productos: [] }) {
        return super.guardar(carrito);
    }
}

export default CarritosDaoMongoDb;