import MongoDb from './src/container/MongoDb.js';

class ProductosDaoMongoDb extends MongoDb {

    constructor() {
        super('productos', {
            descripcion: { type: String, required: true},
            precio: {type: Number, required: true},
            thumbnail: {type: String, required: true}
        })
    }
}

export default ProductosDaoMongoDb;
