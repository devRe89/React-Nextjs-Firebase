import React, {useState, useEffect} from 'react';

const useValidation = (initState, validar, fn) => {

    const [valores, guardarValores] = useState(initState);
    const [errors, guadarErrors] = useState({});
    const [submitForm, guadarSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(errors).length === 0;

            if(noErrores) {
                fn(); // Fn Función que se ejecuta en el componente.
            }
            
            guadarSubmitForm(false);
        }
    }, [errors]);

    // Funcion para capturar datos cuando el usuario esta escribiendo.
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        });
    }

    // evento blur para quitar validaciones de errores
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guadarErrors(erroresValidacion);
    }

    // Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guadarErrors(erroresValidacion);
        guadarSubmitForm(true);
    }

    return {
        valores,
        errors,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidation;
