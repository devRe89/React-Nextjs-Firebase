

export default function validationsCrearProducto(valores){
    let errors = {};

    if(!valores.nombre){
        errors.nombre = 'El nombre es requerido';
    }

    if(!valores.empresa){
        errors.empresa = 'El empresa es requerido';
    }

    if(!valores.url) {
        errors.url = 'La URL del producto es obligatoria';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errors.url = "URL mal formateada o no válida"
    }

    if(!valores.descripcion){
        errors.descripcion = 'El descripcion es requerido';
    }

    return errors;
}

