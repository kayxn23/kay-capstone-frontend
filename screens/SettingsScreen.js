import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import WelcomeScreen from './WelcomeScreen';
import firebase from 'firebase';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text
  } from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Account',

  };

  constructor(props) {
    super(props);
  }

  logOutOfFacebookButton = () => {
    const auth = firebase.auth();
    const navigate = this.props.navigation.navigate;

    console.log(auth);
    auth.signOut().then(function() {
      console.log('Signed Out');
      navigate('Login');
      }, function(error) {
      console.error('Sign Out Error', error);
      });
  }


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
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
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
