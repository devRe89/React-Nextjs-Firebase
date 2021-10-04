export default function validationsAgregarComentario(valores){
    let errors = {};

    if(!valores.comentario){
        errors.comentario = 'El comentario es requerido';
    }

    return errors;
}