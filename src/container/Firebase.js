import admin from 'firebase-admin';
import config from '../container/firebase.js';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase);
})

const db = admin.firestore();

class Firebase {
    constructor(nColeccion) {
        this.coleccion = db.collection(nColeccion);
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if(!doc.exist) {
                throw new Error(`Error al listar. La id no se encontró`);
            } else {
                const info = doc.data();
                return {...info, id }
            }
        } catch (error) {
            throw new Error(`Error al por id: ${error}`);
        }
    }

    async listarAll() {
        try {
            const result = [];
            const captura = await this.coleccion.get();
            captura.forEach(doc => {
                result.push({id: doc.id, ...doc.data() })
            })
            return result;
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`);
        }
    }

    async guardar(nuevo) {
        try {
            const guardado = await this.coleccion.add(nuevo);
            return {...nuevo, id: guardado.id};
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`);
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
        const borrado = await this.coleccion.delete({'_id': elemento._id})
        return borrado;
    }
}