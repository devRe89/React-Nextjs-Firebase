import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';
import DetallesProductos from '../components/layout/DetallesProductos';

import firebase from '../firebase';

export default function Home() {

  const [productos, getProductos] = useState([]); 

  useEffect(() => {
    const obtenerProductos = async () => {
      getProductos(await firebase.getAllProducts());
    }
    obtenerProductos();
  }, []);

  return (
    <div>
        <Layout>
          <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                {productos.map(producto => (
                  <DetallesProductos 
                    key={producto.id}
                    producto={producto}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Layout>
    </div>
  )
}
