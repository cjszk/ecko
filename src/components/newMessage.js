import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, AsyncStorage } from 'react-native';
import HeaderMessage from './HeaderMessage';
import moment from 'moment';
import { connect } from 'react-redux';

class NewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' }
    }

    submitMessage(text) {
        let randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let object = {
            id: randomID,
            text: text,
            thumbsUp: 0,
            thumbsDown: 0,
            children: [],
            time: moment().format('MMM-DD-LT'),
            location: this.props.location.coords
        }
        console.log(object)
        AsyncStorage.setItem(randomID, JSON.stringify(object));
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.noticeBox}>
                    <Text style={styles.notice}>Notice:</Text>
                    <Text style={styles.warning}>Do not share any personal information!</Text>                
                    <Text style={styles.information}>You are posting anonymously (this application will not reveal your identity)</Text>
                    <Text style={styles.information}>City Location will be revealed (other users will still see the city where you posted your message from)</Text>
                </View>
                <TextInput
                multiline={true}
                style={styles.textBox}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                placeholder="Your Message Here"
                placeholderTextColor="#52658F"
                />
                <TouchableOpacity onPress={() => this.submitMessage(this.state.text)}>
                    <Text style={styles.submitButton}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    location: state.mainReducer.location
})

export default (connect(mapStateToProps)(NewMessage))

const $white = '#F7F5E6';
const $black = '#222'

const $colorOne = '#333A56';
const $colorTwo = '#52658F';
const $colorThree = '#F7F5E6';
const $colorFour = '#E8E8E8';

const styles = {
    main: {
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    textBox: {
        backgroundColor: $colorThree,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        borderRadius: 5,
        borderColor: $colorOne,
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: $colorOne,
        fontSize: 18,
        borderRadius: 5,
        borderColor: $colorThree,
        borderWidth: 1,
        alignSelf: 'center',
        padding: 5,
        margin: 5,
        color: $colorThree
    },
    image: {
        position: 'absolute',
        top: 200,
        tintColor: $colorFour,
        height: 50,
        width: 50
    },
    noticeBox: {
        backgroundColor: $colorOne,
        borderRadius: 5,
        borderColor: $colorThree,
        borderWidth: 1,
        padding: 5
    },
    notice: {
        fontSize: 18,
        color: $white
    },
    warning: {
        fontSize: 16,
        color: '#d22',
        fontWeight: 'bold'
    },
    information: {
        color: $white
    }
}