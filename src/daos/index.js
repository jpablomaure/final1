let productosDao;
let carritosDao;

switch (process.env.PERS) {
    case 'json':
        const {defaul: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const {defaul: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break;
    case 'firebase':
        const {defaul: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const {defaul: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js')
        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
    case 'momngoDb':
        const {defaul: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js')
        const {defaul: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        break;
    default:
        const {defaul: ProductosDaoMem } = await import('./productos/ProductosDaoMem.js')
        const {defaul: CarritosDaoMem } = await import('./carritos/CarritosDaoMem.js')
        productosDao = new ProductosDaoMem();
        carritosDao = new CarritosDaoMem();
        break;
}

export { productosDao, carritosDao};