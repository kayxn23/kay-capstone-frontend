import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import NewGameForm from './NewGameForm';
import firebase from 'firebase';


import axios from 'axios';
import { Text, Alert,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
  Button
  } from 'react-native';


import {
  ActivityIndicator,
  Modal} from 'react-native'

//  Alert.alert("game created!");

class LocationsCollection  extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      error: false,
      locations: [],
      displayModal: false,
      displayModalCreateGame: false,
      selectedLocation: {},
      displayModalLogin: false,
    }
  }

  onLogin = () => {
    this.setState({displayModalLogin: false})

    // check if úsername exists in the database

    // if yes, pull the users profile from the DB and set the session data for the app with that users info
    // global.username = 'Kay1Soccer'
    // global.firstname = 'Kay'
    // if no, create a new entry in the database for that user and set the session data to their profile
  }

  triggerModal = (location) => {
    console.log("trigerModal functioncalled" , this.state.selectedLocation);
    this.setState({displayModal: true, selectedLocation: {"id": location.id}});
  }

  closeModal = () => {
    this.setState({displayModal:false});
  }

  triggerCreateGameFormModal = () => {
    this.setState({displayModal: false, displayModalCreateGame: true});
  }

  closeCreateGameFormModal = () => {
    this.setState({displayModalCreateGame:false});
  }


//2019-01-19 10:23:54 -0800
//2019-01-16 18:52:28 Z
//2019-01-16T18:54:20Z
  // addGameCallbacktoGamesCollection = (newGame) => {
  //   //how do i get this to call addCard function that lives in GamesCollection
  // }

  hideModal = () => {
    this.setState({
      displayModalCreateGame: false
    });
  }

  addGame = (newGame) => {
    console.log("what is new game",newGame);
    console.log("what is game_date", newGame.game_date);
    console.log("MY PROPS NOW", this.props);
    //2019-01-19 10:23:54 -0800

    const getFormattedDate = (date) =>
    {
      const newGameDate = new Date(date);
      const month = newGameDate.getMonth() + 1;
      const monthPrefix = month > 9 ? '-' : '-0';
      return newGameDate.getFullYear()
                          + monthPrefix + month
                          + '-' + newGameDate.getDate()
                          + ' ' + newGameDate.getHours()
                          + ':' + newGameDate.getMinutes()
                          + ':' + newGameDate.getSeconds()
                          + ' ' + '-0800';
    }
    newGame.game_date = getFormattedDate(newGame.game_date);
    newGame.organizer = this.props.player;
    const hideModal = this.hideModal;
    console.log("will create with", newGame);

    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      axios.post('http://192.168.1.34:8080/kickit/games', newGame, {headers: {
            'X-login-token': idToken
        }}).then( (response) => {
        hideModal();
      })
      .catch(error => {
        Alert.alert("There was an issue creating this game, please try again.");
        console.log("logging error from post", error.message);
        this.setState({
          error: error.message
        });
      });
    });

  };


  componentDidMount = async () => {
    try {
      ///school 172.24.25.138:8080
      //home 192.168.0.12:8080
      let response = await fetch('http://192.168.1.34:8080/kickit/locations',{
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        }
      })
      let locations = await response.json()
      this.setState({loading: false, locations})
    } catch (e) {
      console.log(e);
      this.setState({loading: false, error: true})
    }
  }


  render() {
    const {loading, error} = this.state

    if (loading) {
      return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      console.log('what is the error before failed to load posts',error);
      return (
        <View style={styles.center}>
        <Text>
        Failed to load posts!
        </Text>
        </View>
      )
    }

    return (
      <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 47.608013,
        longitude: -122.335167,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      >
      {this.state.locations.map(location => (
        <Marker
          key={location.id}
          coordinate={location}
          title={location.location_title}
          onPress={ () => this.triggerModal(location)}
        />
      ))}

      <View >
        <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.displayModal}
        >
        <View style={styles.modalStyle}>
            <View style={{paddingBottom: 40}}>
              <TouchableHighlight style={styles.createGameStyle} onPress={this.triggerCreateGameFormModal}>
              <Text style={{ width: '100%', color: 'black',textAlign: 'center',justifyContent: 'flex-start',}}>    CREATE    </Text>
              </TouchableHighlight>
            </View>


            <View>
            <TouchableHighlight style={styles.closeGameStyle} onPress={this.closeModal}>
            <Text style={{ width: '100%', color: 'black',textAlign: 'center', justifyContent: 'flex-end',}}>    CANCEL    </Text>
            </TouchableHighlight>
            </View>
        </View>

        </Modal>
      </View>

{/*create another modal that is triggers on "create modal" */}
      <View >
        <Modal
            transparent={false}
            animationType="slide"
            visible={this.state.displayModalCreateGame}
        >
        <View style={styles.modalStyle}>
          <View>
            <View>

            <NewGameForm
              location={this.state.selectedLocation}
              organizer={this.props.player}
              addGameCallback={this.addGame}
            />

            <TouchableHighlight style={styles.buttonstyle} onPress={this.closeCreateGameFormModal}>
            <Text style={styles.buttontextstyle}> CANCEL </Text>
            </TouchableHighlight>


            </View>
          </View>
          </View>
        </Modal>
      </View>



      {/*login modal below */}


      <View>
        <Modal
            transparent={false}
            visible={this.state.displayModalLogin}
        >
        <View >
          <View>
            <View>

            <View >
              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
              />
              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
              />

              <Button
                title={'Login'}
                onPress={this.onLogin.bind(this)}
              />
            </View>


            </View>
          </View>
          </View>
        </Modal>
      </View>

      </MapView>


    )
  }
}

const styles = StyleSheet.create({
  createGameStyle: {
    backgroundColor: '#FAD961',
    marginRight: 30,
    marginLeft: 40,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    textAlign: 'center',
  },
  closeGameStyle: {
    backgroundColor: '#68a0cf',
    marginRight: 40,
    marginLeft: 30,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    textAlign: 'center',
  },
  modalStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 10,
    margin: 0,
    borderRadius: 4,
    height: 100,
    padding: 22
  },
  post: {
    flexDirection: 'row',
  },
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
  },
  postBody: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightgray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
  buttonstyle: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttontextstyle: {
    color: '#fff',
    textAlign: 'center',
  },
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
})



export default LocationsCollection ;
