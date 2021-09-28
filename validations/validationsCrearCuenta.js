

export default function validationsCrearCuenta(valores){
    let errors = {};

    if(!valores.nombre){
        errors.nombre = 'El nombre es requerido';
    }

    if(!valores.email){
        errors.email = 'El email es requerido';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errors.email = 'EL email no es valido';
    }

    if(!valores.password){
        errors.password = 'El password es obligatorio';
    }else if(valores.password.length < 6){
        errors.password = 'El password debe ser de al menos 6 carcateres';
    }

    return errors;
}

