import React, { Component } from 'react';
import Slides from '../components/Slides';
import PropTypes from 'prop-types';

import { AppLoading } from 'expo';
// import firebase, { auth, provider } from '../firebase.js';
// import firebase from 'expo-firebase-app';
import { Facebook } from 'expo';
import firebase from 'firebase';

import axios from 'axios';

import {
  AsyncStorage,
  View,
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
      currentUser: {},
      logInStatus: 'signed out',
      errorMessage: 'none'
    }

  }





  async logOutOfFacebookButton() {
    console.log(auth);
    auth.signOut().then(function() {
      console.log('Signed Out');
      }, function(error) {
      console.error('Sign Out Error', error);
      });
  }


   componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        console.log('THIS IS THE USER', user.providerData[0]);

        this.setState({
          currentUser: {
            "first_name": user.providerData[0].displayName,
            "user_name": user.providerData[0].displayName,
            "user_id": user.providerData[0].email,
            "games_played": 0,
            "profile_picture": user.providerData[0].photoURL
          }
        })



        const currentlyLoggedInPlayer = this.state.currentUser;
        const navigate = this.props.navigation.navigate;

        console.log("loggin this.props", this.props);

        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          axios.post('http://192.168.1.34:8080/kickit/players',
                      currentlyLoggedInPlayer,
                      {headers: {'X-login-token': idToken}})
          .then( (response) => response.data)
          .then((data) => {
            console.log("going to navigate to Main with player:", data);

            AsyncStorage.setItem('player', JSON.stringify(data)).then((r) => {
               navigate('Main');
            });
          })
          .catch(error => {
            console.log("ERROR FROM SERVER POSTING new user", error.message);
            this.setState({
              error: error.message
            });
          });

        }).catch(function(error) {
          console.log('PRINTING ERROR FROM TRYING TO SEND TOKEN TO SERVER', error);
        });

        this.setState({ logInStatus: 'We are authenticated now!' });
      } else {
        this.setState({ logInStatus: 'You are currently logged out.' });
      }
    });
  }


  async handleFacebookButton() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email']
    });
    if (type === 'success') {
      //Firebase credential is created with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      auth.signInAndRetrieveDataWithCredential(credential).catch(error => {
        this.setState({ errorMessage: error.message });
      });
    }
  }

  render() {
    if (this.state.currentUser === {}) {
      return <AppLoading/>
    }

    if(this.state.logInStatus === "We are authenticated now!") {
      return (
        <View style={styles.container}>
            <TouchableHighlight
              style={styles.facebookButton}
              name="Facebook"
              underlayColor={styles.facebookButton.backgroundColor}
              onPress={this.logOutOfFacebookButton}
            >
              <Text style={styles.facebookButtonText}>Log out</Text>
            </TouchableHighlight>
        </View>
      );
    }


    return (

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
  currentUserCallback: PropTypes.func.isRequired,
};



export default LoginScreen ;
