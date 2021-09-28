import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';

const Heading = styled.h1`
  color: blue;
`;


export default function NuevoProducto() {
  return (
    <div>
        <Layout>
          <Heading>Nuevo Producto</Heading>
        </Layout>
    </div>
  )
}
