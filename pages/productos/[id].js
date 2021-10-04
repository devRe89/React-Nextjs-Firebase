import React, {useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/router';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import firebase from '../../firebase';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit, Error } from '../../components/ui/Formulario';
import { FirebaseContext } from '../../firebase';
import Boton from '../../components/ui/Boton';

//Validaciones
import useValidation from '../../hooks/useValidation';
import validationsAgregarComentario from '../../validations/validationsAgregarComentario';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const INIT_STATE = {
    comentario: ''
  }


const Producto = () => {

    const [producto, getProducto] = useState({});
    const [error, setError] = useState(false);
    const [db, actDb] = useState(true);
    const {usuario} = useContext(FirebaseContext)
    const {
        valores,
        errors,
        handleSubmit,
        handleChange,
        handleBlur
    } = useValidation(INIT_STATE, validationsAgregarComentario, addComment);
    const {comentario} = valores;

    const router = useRouter();
    const { query: { id } } = router;

    async function addComment(){
        
        try {
            const nuevoComentario = {
                comentario,
                usuarioId: usuario.uid,
                usuarioNombre: usuario.displayName
            }
            const resComentario = await firebase.upComentariosProduct(id, nuevoComentario, producto);
            if (resComentario){
                actDb(true);
            }            
        } catch (error) {
            actDb(false);
            console.log(error.message);
        }

    }

    useEffect(() => {
        const productInfo = async id => {
            if (id && db){
                const product = await firebase.getProductById(id);
                if (product.data()){
                    getProducto(product.data());
                    actDb(false);
                }else{
                    setError(true);
                    actDb(false);
                }
            }
        }
        productInfo(id);
    }, [id, db]);

    const votarProducto = async () => {

        try {   
            const nuevoTotal = await firebase.upVotosProduct(usuario.uid, producto, id);
            if(nuevoTotal){
                getProducto({
                    ...producto,
                    votos: nuevoTotal,
                });
                actDb(true);
            }
        } catch (error) {
            console.log(error.message);
            actDb(false);
        }

    }

    if (Object.keys(producto).length === 0 ) return <p>Cargando...</p>

    const {comentarios, creado, descripcion, empresa, nombre, url, Urlimagen, votos, creador} = producto;

    return ( 
        <Layout>
            <>
                { error && <Error404 /> }

                <div className="contenedor">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>{nombre}</h1>
                    
                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} )} </p>
                            <p>Por: {creador.nombre} de {empresa}</p>
                            <img src={Urlimagen} />
                            <p>{descripcion}</p>

                            <h2>Agrega tu comentario</h2>
                            {usuario && (
                                <>
                                <form
                                    onSubmit={handleSubmit}
                                >
                                    <Campo>
                                        <input 
                                            type="text" 
                                            name="comentario"
                                            value={comentario}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Campo>
                                    {errors.comentario && <Error>{errors.comentario}</Error>}
                                    <InputSubmit 
                                        type='submit'
                                        value="Agregar comentario"
                                    />
                                </form>
                                </>
                            )}
                            <h2
                                css={css`
                                    margin: 2rem 0;
                                `}
                            >Comentarios:</h2>
                            
                            {comentarios.length === 0 ? "Aún no hay comentarios" : (
                                    <ul>
                                        {comentarios.map((comentario, i) => (
                                            <li 
                                                key={`${comentario.usuarioId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comentario.comentario}</p>
                                                <p>Escrito por: 
                                                    <span
                                                        css={css`
                                                            font-weight:bold;
                                                        `}
                                                    >
                                                    {''} {comentario.usuarioNombre}
                                                    </span>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>

                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >Visitar URL</Boton>

                            <div
                                css={css`
                                    margin-top: 5rem;
                                `}
                            >
                                <p
                                    css={css`
                                        text-align: center;
                                    `}
                                >{votos} Votos</p>
                                {usuario && (
                                    <Boton
                                        onClick={votarProducto}
                                    >Votar</Boton>
                                )}
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    );
}
 
export default Producto;
