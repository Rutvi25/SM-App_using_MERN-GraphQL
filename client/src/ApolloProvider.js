import React from "react";
import App from "./App";
import {ApolloClient} from 'apollo-client';
import { HttpLink } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

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