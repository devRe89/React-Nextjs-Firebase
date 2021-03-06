import {useState} from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import {css} from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';


//Validaciones
import useValidation from '../hooks/useValidation';
import validationsCrearCuenta from '../validations/validationsCrearCuenta';

//Firebase
import firebase from '../firebase';
const INIT_STATE = {
  nombre: '',
  email: '',
  password: ''
}

export default function CrearCuenta() {

  const [errorfb, setErrorfb] = useState(false);
  
  const {
    valores,
    errors,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(INIT_STATE, validationsCrearCuenta, nuevaCuenta);
  
  const { nombre, email, password } = valores;
  
  async function nuevaCuenta() {
    try {

      await firebase.registrarUsuario(nombre, email, password);
      Router.push('/');
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
          >Crear cuenta</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errors.nombre && <Error>{errors.nombre}</Error>}

            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="text"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errors.email && <Error>{errors.email}</Error>}

            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errors.password && <Error>{errors.password}</Error>}

            {errorfb && <Error>{errorfb}</Error>}

            <InputSubmit 
              type="submit" 
              value="Crear cuenta" 
            />
          </Formulario>
        </Layout>
    </div>
  )
}
