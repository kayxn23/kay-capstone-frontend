import React, { Component } from 'react';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';
import {
  View,
  Text,
  } from 'react-native'

const SLIDE_DATA = [
  { text: 'Welcome to Seattle Soccer Meetup', color: '#03A9F4'},
  { text: 'this is what the app is!', color: '#03A9F4'}
];

class WelcomeScreen  extends Component {
  state = { token: null }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading/>
    }
    
    return (

      <View>
        <Slides data={SLIDE_DATA}
                onComplete={this.onSlidesComplete}/>
      </View>
    );
  }
}




export default WelcomeScreen ;
