import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import firebase from '../../firebase';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

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


const Producto = () => {

    const [producto, getProducto] = useState({});
    const [error, setError] = useState(false);

    const router = useRouter();
    const { query: { id } } = router;


    useEffect(() => {
        const productInfo = async id => {
            if (id){
                const product = await firebase.getProductById(id);
                if (product.data()){
                    getProducto(product.data());
                }else{
                    setError(true);
                }
            }
        }
        productInfo(id);
    }, [id]);

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
                            <form>
                                <Campo>
                                    <input 
                                        type="text" 
                                        name="mensaje"
                                    />
                                </Campo>
                                <InputSubmit 
                                    type='submit'
                                    value="Agregar comentario"
                                />
                            </form>

                            <h2
                                css={css`
                                    margin: 2rem 0;
                                `}
                            >Comentarios:</h2>
                            
                            {comentarios 
                                ?
                                (comentarios.map(comentario => (
                                    <li>
                                        <p>{comentario.nombre}</p>
                                        <p>Escrito por: {comentario.usuarioNombre}</p>
                                    </li>
                                )))
                                :
                                null
                            }
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
                                <Boton>Votar</Boton>
                            </div>
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    );
}
 
export default Producto;
