import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import Router from './Router'

import AppMain from './src/components/AppMain';
import HeaderMain from './src/components/HeaderMain';
import Main from './src/components/main';
import NewMessage from './src/components/newMessage';
import store from './store';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    }
    // this.watchID = null;
  }
  // watchID: ?number = null;

  //https://www.tutorialspoint.com/react_native/react_native_geolocation.htm

  render() {
    return (
      <Provider store={store}>
          <Router/>
      </Provider>
    );
  }
}

const $white = '#F7F5E6';
const $black = '#222'

const $colorOne = '#333A56';
const $colorTwo = '#52658F';
const $colorThree = '#F7F5E6';
const $colorFour = '#E8E8E8';


const styles = StyleSheet.create({
  container: {
    backgroundColor: $colorTwo,
  },
});

export default App;
