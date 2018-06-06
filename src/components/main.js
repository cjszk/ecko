import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import Geocode from 'react-geocode';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            text: null,
            messages: [],
            currentMessageLocation: null
        }
    }

    componentWillMount() {
        const component = this;
        try {
            return AsyncStorage.getAllKeys().then((result) => {
                console.log(result)
                AsyncStorage.multiGet(result, (err, stores) => {
                    stores.map((result, i, store) => {
                        let value = JSON.parse(store[i][1]);
                        component.setState({
                            messages: [...component.state.messages, value]
                        })
                    });
                });
            })
        } catch (err) {
            alert('error:', err)
        }
    }

    render() {
        const component = this;
        const getCity = (lat, long) => {
            return Geocode.fromLatLng(lat, long)
            .then((response) => {
                const result = `${response.results[0].address_components[3].long_name}, ${response.results[0].address_components[4].short_name}`;
                component.setState({
                    currentMessageLocation: result
                })
                return result;
            })         
            .catch(err => console.log(err))
        }
        console.log(component.state)
        const buildMessages = component.state.messages.map((item) => {
            let buildReplies;
            // getCity(item.)
            if (item.children.length > 0) {
                buildReplies = item.children.map((reply) =>{
                    return (
                    <View>
                        <View style={styles.replyBox}>
                            <View style={styles.messageBoxHeader}>
                                <Text style={styles.name}>Anonymous</Text>
                                <Text style={styles.location}>Redmond, Washington</Text>
                            </View>
                            <View>
                                <Text style={styles.date}>May 28, 4:34PM</Text>                                                    
                                <Text style={styles.message}>{reply.text}
                                </Text>
                            </View>
                            <View style={styles.options}>
                                <Text>{reply.thumbsUp}</Text>
                                <TouchableOpacity style={styles.optionButton}>
                                    <Image style={styles.image} source={require('../images/png/008-like.png')}/>
                                </TouchableOpacity>     
                                <Text>{reply.thumbsDown}</Text>                                
                                <TouchableOpacity style={styles.optionButton}>
                                    <Image style={styles.image} source={require('../images/png/007-dislike.png')}/>                                    
                                </TouchableOpacity>                      
                            </View>
                        </View>
                    </View>
                    )
                })
            }
            return (
                <View key={item.id} style={styles.block}>
                    <View style={styles.messageBox}>
                        <View style={styles.messageBoxHeader}>
                            <Text style={styles.name}>Anonymous</Text>
                            <Text style={styles.location}>{item.location.latitude}{item.location.longitude}</Text>
                        </View>
                        <View>
                            <Text style={styles.date}>{item.time}</Text>                        
                            <Text style={styles.message}>{item.text}
                            </Text>
                        </View>
                        <View style={styles.options}>
                            <Text style={styles.optionText}>Replies: {item.children.length}</Text>
                            <TouchableOpacity style={styles.optionButton}>
                                <Image style={styles.image} source={require('../images/png/005-reply-back.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.optionText}>{item.thumbsUp}</Text>
                            <TouchableOpacity style={styles.optionButton}>
                                <Image style={styles.image} source={require('../images/png/008-like.png')}/>
                            </TouchableOpacity>     
                            <Text style={styles.optionText}>{item.thumbsDown}</Text>                        
                            <TouchableOpacity style={styles.optionButton}>
                                <Image style={styles.image} source={require('../images/png/007-dislike.png')}/>                                    
                            </TouchableOpacity>                             
                        </View>
                    </View>
                    {buildReplies}
                </View>
            )
        })

        return (
            <KeyboardAvoidingView
            style={styles.main}
            behavior="padding">
            {buildMessages}
            </KeyboardAvoidingView>
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
        flex: 1
    },
    block: {
        padding: 5
    },
    messageBox: {
        padding: 10,
        backgroundColor: $colorOne,
        borderRadius: 5,
        borderColor: $colorThree,
        borderWidth: 1
    },
    messageBoxHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        color: $colorFour        
    },
    location: {
        fontSize: 16,
        color: $colorFour        
    },
    date: {
        marginLeft: 10,
        fontSize: 12,
        color: $colorFour                
    },
    message: {
        paddingTop: 5,
        paddingBottom: 5,
        color: $white                
    },
    image: {
        width: 20,
        height: 20,
        tintColor: $colorThree,
    },
    replyTextBox: {
        padding: 10,
        marginLeft: 10,        
        borderRadius: 5,
        borderColor: $colorOne,
        borderWidth: 1
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
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: $colorOne,
        fontSize: 12,
        borderRadius: 5,
        borderColor: $colorThree,
        borderWidth: 1,
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5,
        color: $colorThree
    },
    replyBox: {
        padding: 10,
        marginLeft: 10,        
        borderRadius: 5,
        borderColor: $colorOne,
        borderWidth: 1
    },
    options: {
        marginLeft: 40,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    optionText: {
        color: $colorFour,
        paddingLeft: 20
    }, 
    optionButton: {
        paddingRight: 10,
        paddingLeft: 10
    }
}