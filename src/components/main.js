import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
// import Geocode from 'react-geocode';
import moment from 'moment';

import {getMessages, postReply} from '../actions/messages';

class Main extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            text: null,
            messages: [],
            currentMessageLocation: null,
            replyTo: null,
            showReplies: null
        }
    }

    submitMessage(text) {
        try {
            let object = {
                message_id: this.state.replyTo,
                message: text,
                time: moment().format('MMM-DD LT'),
                exact_time: Date.now(),
                location: this.props.location.coords
            }
            this.props.dispatch(postReply(object))
            this.setState({
                replyTo: null
            })
        } catch(err){}
    }

    componentWillMount() {
        const component = this;
        try {
            component.props.dispatch(getMessages())
        } catch (err) {}
    }

    render() {        
        const component = this;
        try {            
            const buildMessages = component.props.messages.map((item) => {
                let buildReplies;

                let replyTo = (
                    <View style={styles.replyTextBox}>
                        <TextInput
                        multiline={true}
                        style={styles.textBox}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        maxLength={250}                        
                        placeholder="Your Message Here"
                        placeholderTextColor="#52658F"
                        />
                    <TouchableOpacity onPress={() => this.submitMessage(this.state.text)}>
                        <Text style={styles.submitButton}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                ) 

                if (item.replies.length > 0) {
                    buildReplies = item.replies.map((reply) =>{
                        return (
                        <View key={reply.id}>
                            <View style={styles.replyBox}>
                                <View style={styles.messageBoxHeader}>
                                    <Text style={styles.name}>Anonymous</Text>
                                    <Text style={styles.location}>{reply.location.latitude}, {reply.location.longitude}</Text>
                                </View>
                                <View>
                                    <Text style={styles.date}>May 28, 4:34PM</Text>                                                    
                                    <Text style={styles.message}>{reply.message}
                                    </Text>
                                </View>
                                <View style={styles.options}>
                                    <Text style={styles.optionText}>{reply.thumbs_up}</Text>
                                    <TouchableOpacity style={styles.optionButton}>
                                        <Image style={styles.image} source={require('../images/png/008-like.png')}/>
                                    </TouchableOpacity>     
                                    <Text style={styles.optionText}>{reply.thumbs_down}</Text>                                
                                    <TouchableOpacity style={styles.optionButton}>
                                        <Image style={styles.image} source={require('../images/png/007-dislike.png')}/>                                    
                                    </TouchableOpacity>                      
                                </View>
                            </View>
                        </View>
                        )
                    })
                }
                if (item.id === component.state.replyTo) {
                    return (
                    <View ref={item.exact_time} key={item.id} style={styles.block}>
                        <TouchableOpacity onPress={(event) => {
                                    if (component.state.showReplies !== null) {
                                        component.setState({showReplies: null})
                                    } else {
                                        component.setState({showReplies: item.id})
                                    }
                                }} style={styles.messageBox}>
                            <View style={styles.messageBoxHeader}>
                                <Text style={styles.name}>Anonymous</Text>
                                <Text style={styles.location}>{item.location.latitude}, {item.location.longitude}</Text>
                            </View>
                            <View>
                                <Text style={styles.date}>{item.time}</Text>                        
                                <Text style={styles.message}>{item.message}
                                </Text>
                            </View>
                            <View style={styles.options}>
                                <Text style={styles.replyCount}>Replies: {item.replies.length}</Text>
                                <TouchableOpacity onPress={(event) => component.setState({replyTo: item.id})} style={styles.optionButton}>
                                    <Image style={styles.image} source={require('../images/png/005-reply-back.png')}/>
                                </TouchableOpacity>
                                <Text style={styles.optionText}>{item.thumbs_up}</Text>
                                <TouchableOpacity style={styles.optionButton}>
                                    <Image style={styles.image} source={require('../images/png/008-like.png')}/>
                                </TouchableOpacity>     
                                <Text style={styles.optionText}>{item.thumbs_down}</Text>                        
                                <TouchableOpacity style={styles.optionButton}>
                                    <Image style={styles.image} source={require('../images/png/007-dislike.png')}/>                                    
                                </TouchableOpacity>                             
                            </View>
                        </TouchableOpacity>
                        {replyTo}
                        {buildReplies}
                    </View>
                    )
                } else {
                    if (item.id === component.state.showReplies ) { 
                        return (
                            <View ref={item.exact_time} key={item.id} style={styles.block}>
                                <TouchableOpacity onPress={(event) => {
                                    if (component.state.showReplies !== null) {
                                        component.setState({showReplies: null})
                                    } else {
                                        component.setState({showReplies: item.id})
                                    }
                                }} style={styles.messageBox}>
                                    <View style={styles.messageBoxHeader}>
                                        <Text style={styles.name}>Anonymous</Text>
                                        <Text style={styles.location}>{item.location.latitude}, {item.location.longitude}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.date}>{item.time}</Text>                        
                                        <Text style={styles.message}>{item.message}
                                        </Text>
                                    </View>
                                    <View style={styles.options}>
                                        <Text style={styles.replyCount}>Replies: {item.replies.length}</Text>
                                        <TouchableOpacity onPress={(event) => component.setState({replyTo: item.id, showReplies: item.id})} style={styles.optionButton}>
                                            <Image style={styles.image} source={require('../images/png/005-reply-back.png')}/>
                                        </TouchableOpacity>
                                        <Text style={styles.optionText}>{item.thumbs_up}</Text>
                                        <TouchableOpacity style={styles.optionButton}>
                                            <Image style={styles.image} source={require('../images/png/008-like.png')}/>
                                        </TouchableOpacity>     
                                        <Text style={styles.optionText}>{item.thumbs_down}</Text>                        
                                        <TouchableOpacity style={styles.optionButton}>
                                            <Image style={styles.image} source={require('../images/png/007-dislike.png')}/>                                    
                                        </TouchableOpacity>                             
                                    </View>
                                </TouchableOpacity>
                                {buildReplies}
                            </View>
                        )
                    } else {
                        return (
                            <View ref={item.exact_time} key={item.id} style={styles.block}>
                            <TouchableOpacity onPress={(event) => {
                                    if (component.state.showReplies !== null) {
                                        component.setState({showReplies: null})
                                    } else {
                                        component.setState({showReplies: item.id})
                                    }
                                }} style={styles.messageBox}>
                                <View style={styles.messageBoxHeader}>
                                    <Text style={styles.name}>Anonymous</Text>
                                    <Text style={styles.location}>{item.location.latitude}, {item.location.longitude}</Text>
                                </View>
                                <View>
                                    <Text style={styles.date}>{item.time}</Text>                        
                                    <Text style={styles.message}>{item.message}
                                    </Text>
                                </View>
                                <View style={styles.options}>
                                    <Text style={styles.replyCount}>Replies: {item.replies.length}</Text>
                                    <TouchableOpacity onPress={(event) => component.setState({replyTo: item.id, showReplies: item.id})} style={styles.optionButton}>
                                        <Image style={styles.image} source={require('../images/png/005-reply-back.png')}/>
                                    </TouchableOpacity>
                                    <Text style={styles.optionText}>{item.thumbs_up}</Text>
                                    <TouchableOpacity style={styles.optionButton}>
                                        <Image style={styles.image} source={require('../images/png/008-like.png')}/>
                                    </TouchableOpacity>     
                                    <Text style={styles.optionText}>{item.thumbs_down}</Text>                        
                                    <TouchableOpacity style={styles.optionButton}>
                                        <Image style={styles.image} source={require('../images/png/007-dislike.png')}/>                                    
                                    </TouchableOpacity>                             
                                </View>
                            </TouchableOpacity>
                        </View>
                        )

                    }

                }
        })
        .sort((a,b) => {
            return b.ref - a.ref
        })
        return (
            <KeyboardAvoidingView
            style={styles.main}
            behavior="padding">
            {buildMessages}
            </KeyboardAvoidingView>
        )
    } catch(err) {
        return (
            <Text>
                No messages to display (yet)
            </Text>
        )
    }
    }
}

const mapStateToProps = state => ({
    location: state.mainReducer.location,
    messages: state.messagesReducer.messages
})

export default (connect(mapStateToProps)(Main))

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
        color: $white,
        fontSize: 16            
    },
    image: {
        width: 25,
        height: 25,
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
        fontSize: 16,
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
    replyCount: {
        paddingRight: 20,
        color: $colorFour,
        fontSize: 18,
        marginTop: 5
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