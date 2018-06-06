import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import HeaderMessage from './HeaderMessage';
import NewMessage from './newMessage';

export default class AppMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' }
    }

    render() {
        return (
        <View style={styles.main}>
            <HeaderMessage/>
            <NewMessage/>
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
    main: {
        flex: 1,
        backgroundColor: $colorTwo
    }
}