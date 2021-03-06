import React, { Component } from 'react';
import Slides from '../components/Slides';
import PropTypes from 'prop-types';
import Splash from '../assets/images/splash.png';

import { AppLoading } from 'expo';
// import firebase, { auth, provider } from '../firebase.js';
// import firebase from 'expo-firebase-app';
import { Facebook } from 'expo';
import firebase from 'firebase';

import axios from 'axios';

import {
  ImageBackground,
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
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      currentUser: {},
      logInStatus: false,
      errorMessage: 'none',
      loadingUserState: true
    }

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
        console.log("logging currently logged in player",currentlyLoggedInPlayer);
        const navigate = this.props.navigation.navigate;

        console.log("loggin this.props", this.props);

        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          axios.post('https://seattle-soccer-pickup.herokuapp.com/kickit/players',
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

        this.setState({ logInStatus: true, loadingUserState: false });
      } else {
        this.setState({ logInStatus: false, loadingUserState: false });
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
    console.log('current user', this.state.currentUser);

      return (
        <ImageBackground source={require('../assets/images/splash.png')} style={styles.container}>

             { !this.state.loadingUserState && !this.state.logInStatus &&
              (<TouchableHighlight
                style={styles.facebookButton}
                name="Facebook"
                underlayColor={styles.facebookButton.backgroundColor}
                onPress={() => this.handleFacebookButton()}
              >
                <Text style={styles.facebookButtonText}>Log in with Facebook</Text>
              </TouchableHighlight>
            )
            }
        </ImageBackground>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: null,
    height: null,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2089dc',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  facebookButton: {
    marginTop: 400,
    width: 375 * 0.75,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  facebookButtonText: {
    color: 'black'
  },
  space: {
    height: 17
  }
});

LoginScreen.propTypes = {
};



export default LoginScreen ;
