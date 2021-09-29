import {useState} from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import {css} from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';


//Validaciones
import useValidation from '../hooks/useValidation';
import validationsCrearProducto from '../validations/validationsCrearProducto';

//Firebase
import firebase from '../firebase';

const INIT_STATE = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: ''
}

export default function NuevoProducto() {

  const [errorfb, setErrorfb] = useState(false);
  
  const {
    valores,
    errors,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(INIT_STATE, validationsCrearProducto, nuevoProducto);

  const {nombre, empresa, imagen, url, descripcion} = valores;

  function nuevoProducto(){
    console.log('creando producto...');
  }

  return (
    <div>
        <Layout>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Nuevo Producto</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
              <legend>Información general</legend>
              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input 
                  type="text"
                  id="nombre"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errors.nombre && <Error>{errors.nombre}</Error>}

              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input 
                  type="text"
                  id="empresa"
                  placeholder="Empresa"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errors.empresa && <Error>{errors.empresa}</Error>}

              <Campo>
                <label htmlFor="url">Url</label>
                <input 
                  type="url"
                  id="url"
                  placeholder="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errors.url && <Error>{errors.url}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <input 
                  type="file"
                  id="imagen"
                  placeholder="imagen"
                  name="imagen"
                  value={imagen}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errors.imagen && <Error>{errors.imagen}</Error>}

            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>
              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea 
                  id="descripcion"
                  placeholder="Descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>

              {errors.descripcion && <Error>{errors.descripcion}</Error>}
            </fieldset>

            {errorfb && <Error>{errorfb}</Error>}

            <InputSubmit 
              type="submit" 
              value="Crear producto" 
            />
          </Formulario>
        </Layout>
    </div>
  )
}
