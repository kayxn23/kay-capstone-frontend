import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import NewGameForm from './NewGameForm';
import firebase from 'firebase';
import {Header} from 'react-native-elements'


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
  }

  triggerModal = (location) => {
    console.log("trigerModal functioncalled" , this.state.selectedLocation);
    this.setState({displayModal: true, selectedLocation: {"id": location.id}});
  }

  closeModal = () => {
    this.setState({
      displayModal:false
    });
  }

  closeAllModals = () => {
    this.setState({
      displayModal:false,
      displayModalCreateGame: false
    });
  }

  triggerCreateGameFormModal = () => {
    this.setState({displayModal: false, displayModalCreateGame: true});
  }

  closeCreateGameFormModal = () => {
    this.setState({displayModalCreateGame:false});
  }

  hideModal = () => {
    this.setState({
      displayModalCreateGame: false
    });
  }

  addGame = (newGame) => {
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

    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      axios.post('https://seattle-soccer-pickup.herokuapp.com/kickit/games', newGame, {headers: {
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
      ///school 192.168.1.34:8080
      //home 192.168.0.12:8080
      let response = await fetch('https://seattle-soccer-pickup.herokuapp.com/kickit/locations',{
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

      <View>
        <Modal
            transparent={false}
            animationType="fade"
            visible={this.state.displayModal}
        >
        <Header
          centerComponent={{ text: 'Create a game!', style: { color: '#fff' } }}
          rightComponent={{ icon: 'close', color: '#fff', onPress:() => this.closeModal()}}
        />
        <View style={{flex: 1, justifyContent:"center"}}>
          <TouchableHighlight style={styles.createGameStyle} onPress={this.triggerCreateGameFormModal}>
          <Text style={{ width: '100%', color: 'white',textAlign: 'center',justifyContent: 'flex-start',}}>START A NEW GAME</Text>
          </TouchableHighlight>
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
        <View>
            <NewGameForm
              location={this.state.selectedLocation}
              organizer={this.props.player}
              addGameCallback={this.addGame}
              closeModal={this.closeAllModals}
            />
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
    backgroundColor: '#68a0cf',
    marginRight: 30,
    marginLeft: 40,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
  },
  modalStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 10,
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
