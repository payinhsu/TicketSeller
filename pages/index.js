import React from 'react';
import { compose } from 'recompose';
import withRedux from 'next-redux-wrapper';
import styled, { keyframes } from 'styled-components';
import Layout from '~/containers/Layout';
import withApolloProvider from '~/lib/withApolloProvider';
import initStore from '~/lib/store';

export default compose(
  withApolloProvider,
  withRedux(initStore),
)(() => (
  <Layout>
    <Container>
      <HintText>Welcome to AIA</HintText>
    </Container>
  </Layout>
));

const Fading = keyframes`
0% {
  opacity:0.3;
}
50% {
  opacity: 1;  
}
100% {
  opacity: 0.3;
}
`;
const Container = styled.div`
height:500px;
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;
const HintText = styled.div`
margin-top:50px;
color:#2F323E;
font-size:30px;
animation: ${Fading} 3s linear infinite;
display:flex;
align-items:center;
justify-content:center;
`;
