import mongoose from 'mongoose';
import config from './src/utils/config.js';

await mongoose.connect(config.mongodb.cnxSrt, config.mongodb.options);

class MongoDb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async listar(id) {
        try {
            const docs = await this.coleccion.find({'_id: id } , {__v: 0'});
            if (docs.length == 0) {
                throw new Error(`Error al listar por id: no encontrado`);
            } else {
                const result = docs[0]
                return result;
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`);
        }
    }

    async listarAll() {
        try {
            let docs = await this.coleccion.find({}, {__v:0}).lean();
            return docs;
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`);
        }
    }

    async guardar(nuevo) {
        try {
            let doc = await this.coleccion.create(nuevo);

        } catch (error) {  
            throw new Error(`Error al garudar: ${error}`);
        }
    }

    async actualizar(nuevo) {
        try {
            const actualizado = await this.coleccion.updateOne({'_id': nuevo._id }, nuevo) 
            if (actualizado == 0 ) {
                throw new Error(`Error al actualizar: no encontrado`);
            } else return nuevo;
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`);
        }
    }

    async borrar(elemento) {
        const borrado = await this.coleccion.deleteOne({'_id': elemento._id})
        return borrado;
    }

    
}

await mongoose.disconnect();

