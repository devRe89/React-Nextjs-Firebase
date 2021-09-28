import Layout from '../components/layout/Layout';
import styled from '@emotion/styled';

const Heading = styled.h1`
  color: blue;
`;


export default function Login() {
  return (
    <div>
        <Layout>
          <Heading>Login</Heading>
        </Layout>
    </div>
  )
}
