import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getLocation } from '../actions/main';

class HeaderMain extends React.Component {
    
    render() {
        if (this.props.location === null) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  this.props.dispatch(getLocation(position))
              },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              );
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text style={styles.menuBlock}></Text>
                    <Text style={styles.menuBlock}></Text>
                    <Text style={styles.menuBlock}></Text>                    
                </TouchableOpacity>
                <Text style={styles.header}>Ecko</Text>
                <TouchableOpacity onPress={() => Actions.newMessage()}>
                    <Image style={styles.messageImage} source={require('../images/png/006-mail-1.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    location: state.mainReducer.location
})

export default (connect(mapStateToProps)(HeaderMain))


const $white = '#F7F5E6';
const $black = '#222'

const $colorOne = '#333A56';
const $colorTwo = '#52658F';
const $colorThree = '#F7F5E6';
const $colorFour = '#E8E8E8';

const styles = {
    container: {
        backgroundColor: $colorOne,
        paddingBottom: 10,
        paddingTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menuBlock: {
        width: 35,
        height: 5,
        backgroundColor: $white,
        marginTop: 6,
        marginBottom: 1
    },
    messageImage: {
        height: 50,
        width: 50,
        tintColor: $white
    },
    menu: {
        color: $white,
        fontSize: 16,
    },
    header: {
        color: $white,
        fontSize: 24,
        marginLeft: 30
    },
    newMessage: {
        color: $white
    }
  };