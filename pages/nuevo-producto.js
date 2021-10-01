import {useState} from 'react';
import Layout from '../components/layout/Layout';
import Router, {useRouter} from 'next/router';
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
  // imagen: '',
  url: '',
  descripcion: ''
}

export default function NuevoProducto() {

  const [errorfb, setErrorfb] = useState(false);
  const [image, getImage] = useState(null);
  const router = useRouter();
  
  const {
    valores,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INIT_STATE, validationsCrearProducto, nuevoProducto);
  const {nombre, empresa, url, descripcion} = valores;

  const handleChangeFile = e => {
    getImage(e.target.files[0]);
  }

  async function nuevoProducto(){
    try {

      const producto = {
        nombre,
        empresa,
        url,
        Urlimagen: image,
        descripcion,
        votos: 0,
        comentarios: [],
        creado: Date.now()
      }

      await firebase.crearProducto(producto);

      return router.push('/');

    } catch (error) {
      setErrorfb(error.message);
    }
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
                  onChange={handleChangeFile}
                />
              </Campo>

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
