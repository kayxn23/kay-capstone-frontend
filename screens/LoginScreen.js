import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';
// import firebase, { auth, provider } from '../firebase.js';
// import firebase from 'expo-firebase-app';
import { Facebook } from 'expo';
import firebase from 'firebase';
import {
  Alert,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
  Text
  } from 'react-native'

const FACEBOOK_APP_ID = '227546764797077';

  const config = {
    apiKey: "AIzaSyD88Y6u-KAZIkOEZBfPVE8qEOedzmn0pf8",
    authDomain: "kay-capstone-frontend.firebaseapp.com",
    databaseURL: "https://kay-capstone-frontend.firebaseio.com",
    projectId: "kay-capstone-frontend",
    messagingSenderId: "788353942103"
  };
  firebase.initializeApp(config);

  const auth = firebase.auth();


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
      user: null,
      logInStatus: 'signed out',
      errorMessage: 'none'
    }
  }


   componentDidMount() {
    auth.onAuthStateChanged(user => {
      console.log('this is the user',user);
      if (user != null) {
        this.setState({ logInStatus: 'We are authenticated now!' });
      } else {
        this.setState({ logInStatus: 'You are currently logged out.' });
      }
    });
  }


  async logOutOfFacebookButton() {
    console.log(auth);
    auth.signOut().then(function() {
      console.log('Signed Out');
      }, function(error) {
      console.error('Sign Out Error', error);
      });
  }

  async handleFacebookButton() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email']
    });
    if (type === 'success') {
      //Firebase credential is created with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      console.log('printing credential',credential);
      auth.signInAndRetrieveDataWithCredential(credential).catch(error => {
        this.setState({ errorMessage: error.message });
      });
    }
  }

  render() {
    if (this.state.token === null) {
      return <AppLoading/>
    }

    if(this.state.logInStatus === "We are authenticated now!") {
      return (
        <TouchableHighlight
          style={styles.facebookButton}
          name="Facebook"
          underlayColor={styles.facebookButton.backgroundColor}
          onPress={this.logOutOfFacebookButton}
        >
          <Text style={styles.facebookButtonText}>Log out</Text>
        </TouchableHighlight>
      );
    }


    return (

        <View style={styles.container}>

            <View style={styles.container}>


              <TouchableHighlight
                style={styles.facebookButton}
                name="Facebook"
                underlayColor={styles.facebookButton.backgroundColor}
                onPress={() => this.handleFacebookButton()}
              >
                <Text style={styles.facebookButtonText}>Log in with Facebook</Text>
              </TouchableHighlight>

              <View style={styles.space} />
              <Text>Logged In Status: {this.state.logInStatus}</Text>
              <View style={styles.space} />
              <Text> Log In Error Messages: {this.state.errorMessage}</Text>
            </View>

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
  facebookButton: {
  width: 375 * 0.75,
  height: 48,
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#3B5998'
  },
  facebookButtonText: {
    color: '#fff'
  },
  space: {
    height: 17
  }
});

LoginScreen.propTypes = {
  loginCallback: PropTypes.func.isRequired,
};



export default LoginScreen ;
