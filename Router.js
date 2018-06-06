import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import AppMain from './src/components/AppMain';
import AppMessage from './src/components/AppMessage';

const RouterComponent = (props) => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="main" component={AppMain} title="main" hideNavBar />
                <Scene key="newMessage" component={AppMessage} title="newMessage" hideNavBar/>
            </Scene>
        </Router>
)

}


const mapStateToProps = state => ({
    location: state.mainReducer.location
})

export default (connect(mapStateToProps)(RouterComponent))

// export default RouterComponent;