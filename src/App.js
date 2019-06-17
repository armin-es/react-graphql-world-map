import React, { Component } from 'react';
import './App.css';
import MapApp from './map-app';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com'
});
class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <MapApp />
        </ApolloProvider>
      </div>
    );
  }

}

export default App;
