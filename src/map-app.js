import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MyMap from './map';
import world from '@south-paw/react-vector-maps/maps/json/world.json';
import SimpleAppBar from './app-bar';
import PaperSheet from './country-info';

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      native
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

class MapApp extends Component {
  state = {
    country: 'CA',
    current: 'CA',
  };

  getCountryId(event) {
    return event.target.attributes.id.value.toUpperCase();
  }

  getCountryInfo(data, code) {
    return data.countries.filter(country => country.code === code)[0];
  }

  onCountryChange = event => {
    const id = this.getCountryId(event);
    this.setState(
      {
        country: id,
        current: id,
      }
    );
  };

  onCountryMouseOver = event => {
    this.setState(
      {
        current: this.getCountryId(event)
      }
    );
  };

  render() {
    return (
      <Query query={GET_COUNTRIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;

          return (
            <div>
              <SimpleAppBar />
              <PaperSheet
                {...this.getCountryInfo(data, this.state.country)}
              />
              <MyMap
                map={world}
                onClick={this.onCountryChange}
                onMouseOver={this.onCountryMouseOver}
                current={this.state.current}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MapApp;