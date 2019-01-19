import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

import {
  Alert,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
  } from 'react-native'

// const SLIDE_DATA = [
//   { text: 'Welcome to Seattle Soccer Meetup', color: '#03A9F4'},
//   { text: 'this is what the app is!', color: '#03A9F4'}
// ];

//  onSlidesComplete = () => {
  //   this.props.navigation.navigate('auth');
  // }

class LoginScreen  extends Component {
  constructor(props){
    super(props);

    this.state = {
      token: '',
      loginUsername: '',
      loginPassword: ''
    }
  }




  //   UNSAFE_componentWillReceiveProps(nextProps) {
  //    if(this.props.username !== nextProps.username) {
  //      this.setState({loginUsername: nextProps.username});
  //    }
  // }


  render() {
    if (this.state.token === null) {
      return <AppLoading/>
    }

    return (

        <View style={styles.container}>
        <Text> Welcome to the Login Screen </Text>
        <TextInput
          value={this.state.loginUsername}
          onChangeText={(loginUsername) => this.setState({ loginUsername })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.loginPassword}
          onChangeText={(loginPassword) => this.setState({ loginPassword })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={() => this.props.loginCallback(this.state.loginUsername, this.state.loginPassword)}
        />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

LoginScreen.propTypes = {
  loginCallback: PropTypes.func.isRequired,
};



export default LoginScreen ;
