export class Memoria {
    constructor(ruta){
        this.ruta = ruta;
    };

    listar(id) {
        const objs = this.listarAll();
        const buscado = objs.find(o => o.id == id);
        return buscado;
    };

    listarAll() {
        try {
            const objs = this.ruta;
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    }

    guardar(obj) {
        const objs = this.listarAll();

        let newId
        if (objs.length == 0) {
            newId = 1;
        } else {
            newId = objs[objs.length - 1].id + 1;
        }
        const newObj = { ...obj, id: newId, timestamp: Date.now()};
        objs.push(newObj);

    }

    actualizar(elem, id) {
        const objs =  this.listarAll();
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = { ...elem, id}
        }
    }
    
    borrar(id) {
        const objs = this.listarAll();
        const index = objs.findIndex(o => o.id == id)

        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        };
        objs.splice(index, 1);
    };

}