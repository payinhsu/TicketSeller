import React from 'react'
import Layout from '~/containers/Layout'
import withApolloProvider from '~/lib/withApolloProvider'
import { compose } from 'recompose'
import initStore from '~/lib/store'
import withRedux from 'next-redux-wrapper'
import styled, { keyframes } from 'styled-components'

export default compose(
  withApolloProvider,
  withRedux(initStore)
)(() => (
               <Layout>
               <Container>
               <HintText>Welcome to Ticket Seller</HintText>
               </Container>
               </Layout>
))

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
`
const Container = styled.div`
height:500px;
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const HintText = styled.div`
margin-top:50px;
color:white;
font-size:30px;
animation: ${Fading} 3s linear infinite;
display:flex;
align-items:center;
justify-content:center;
`
