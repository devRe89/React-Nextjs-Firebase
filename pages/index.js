import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';

const Heading = styled.h1`
  color: blue;
`;


export default function Home() {
  return (
    <div>
        <Layout>
          <Heading>Home</Heading>
        </Layout>
    </div>
  )
}
