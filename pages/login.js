import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import {css} from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

//Validaciones
import useValidation from '../hooks/useValidation';
import validationsIniciarSesion from '../validations/validationsIniciarSesion';

//Firebase
import firebase from '../firebase';


const INIT_STATE = {
  email: '',
  password: ''
}
export default function Login() {

  const [errorfb, setErrorfb] = useState(false);
  
  const {
    valores,
    errors,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(INIT_STATE, validationsIniciarSesion, nuevaSesion);

  const {email, password} = valores;

  async function nuevaSesion(){
    try {
        await firebase.initSesion(email, password);
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
          >Iniciar sesión</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >

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
              value="Iniciar sesión" 
            />
          </Formulario>
        </Layout>
    </div>
  )
}
