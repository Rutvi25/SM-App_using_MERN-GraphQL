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

import { persistor, store } from './redux/store';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: httpLink,
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
