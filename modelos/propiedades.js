// URL para acceder a la API
const url = './api/datos.php?tabla=propiedades';

/**
 * Obtiene de manera asíncrona los artículos
 * @return datos los datos en formato JSON
 */
export async function obtenerPropiedades() {
    const res = await fetch(`${url}&accion=seleccionar`);
    const datos = await res.json();
    if(res.status !== 200) {
        throw Error('No se pudo obtener los datos');
    }
    return datos;
}

/**
 * Inserta los datos en la Base de Datos
 * @param datos los datos a insertar
 */
export function insertarPropiedades(datos) {
    fetch(`${url}&accion=insertar`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    })
}

/**
 * Actualiza los datos en la Base de Datos
 * @param datos los datos a actualizar
 * @id el id del artículo
 */
export const actualizarPropiedades = (datos, id) => { // export function actualizarPropiedades(datos. id) {}
    fetch(`${url}&accion=actualizar&id=${id}`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

/**
 * Elimina los datos en la Base de Datos
 * @param id el id del artículo
 */
export const eliminarPropiedad = (id) => {
    fetch(`${url}&accion=eliminar&id=${id}`, {})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    })
}