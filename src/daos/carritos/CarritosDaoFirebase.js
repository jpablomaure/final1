import Firebase from '../../container/Firebase.js';

class CarritosDaoFirebase extends Firebase {

    constructor() {
        super('carritos');
    }

    async guardar(carrito = {productos: [] }){
        return super.guardar(carrito)
    }
}

export default CarritosDaoFirebase;