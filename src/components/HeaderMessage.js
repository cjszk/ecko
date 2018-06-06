import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class HeaderMessage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text style={styles.menuBlock}></Text>
                    <Text style={styles.menuBlock}></Text>
                    <Text style={styles.menuBlock}></Text>                    
                </TouchableOpacity>
                <Text style={styles.header}>Ecko</Text>
                <TouchableOpacity onPress={() => Actions.main()}>
                    <Image style={styles.messageImage} source={require('../images/png/009-back.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

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