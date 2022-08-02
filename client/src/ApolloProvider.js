import React from 'react';
import App from './App';
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { setContext } from 'apollo-link-context';

import { persistor, store } from './redux/store';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000',
  credentials: 'same-origin',
});
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken') 
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
