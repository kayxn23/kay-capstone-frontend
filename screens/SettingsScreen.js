import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import WelcomeScreen from './WelcomeScreen';
import firebase from 'firebase';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  AsyncStorage
  } from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Account',
    headerStyle: {
      backgroundColor: '#2089dc',
    },
    headerTitleStyle: {
        color: 'white',
      },
  };

  constructor(props) {
    super(props);

    this.state = {
      player: {}
    };
    this.fetchPlayer();
  }

  fetchPlayer = async () => {
    const player = await AsyncStorage.getItem('player');

    this.setState({player: JSON.parse(player)});
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
    console.log("MY STATE GAMES FROM SETTINGS SCREEn", this.state);

    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View >
          <View style={styles.header}></View>
          <Image style={styles.avatar}
                 source={{uri: 'https://avatars2.githubusercontent.com/u/30675614?s=460&v=4'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.player.first_name}</Text>
              <Text style={styles.info}>{this.state.player.user_id}</Text>
              <Text style={styles.description}>Games played: 7 </Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.facebookButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableHighlight
                style={styles.buttonContainer}
                name="Facebook"
                underlayColor={styles.facebookButton.backgroundColor}
                onPress={this.logOutOfFacebookButton}
              >
                <Text style={styles.facebookButtonText}>Log out</Text>
              </TouchableHighlight>
            </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#B1EDE8",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    color: "#fff",
    backgroundColor: "#68a0cf",
  },
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
  backgroundColor: '#68a0cf'
  },
  facebookButtonText: {
    color: '#fff'
  },
  space: {
    height: 17
  }
});
