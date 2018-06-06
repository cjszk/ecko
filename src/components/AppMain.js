import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import HeaderMain from './HeaderMain';
import Main from './main';
import NewMessage from './newMessage';

class AppMain extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderMain/>
        <ScrollView>
          <Main/>
        </ScrollView>
      </View>
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
    flex: 1,
    backgroundColor: $colorTwo,
  },

});
const mapStateToProps = state => ({

  });

export default connect(mapStateToProps)(AppMain);
