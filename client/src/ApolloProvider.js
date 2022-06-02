import React from "react";
import App from "./App";
import { 
  HttpLink, 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider 
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)