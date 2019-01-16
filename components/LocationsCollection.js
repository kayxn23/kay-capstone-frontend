import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import NewGameForm from './NewGameForm';
import axios from 'axios';


import { View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Modal,
  StyleSheet} from 'react-native'


class LocationsCollection  extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      error: false,
      locations: [],
      displayModal: false,
      displayModalCreateGame: false,
      selectedLocation: '',
      organizer: {"player_id": 8}
    }
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

  addGame = (newGame) => {
    console.log("what is new game",newGame);
    axios.post('http://192.168.0.12:8080/sspickup/games', newGame)
    .then( (response) => {
      console.log('API response success!', response);
      const {games} = this.state;
      games.push(newGame);
      this.setState({
        games
      })
    })
    .catch(error => {
      console.log(error.message);
      this.setState({
        error: error.message
      });
    });
  };


  componentDidMount = async () => {
    try {
      ///school 172.24.25.138:8080
      //home 192.168.0.12:8080
      let response = await fetch('http://192.168.0.12:8080/sspickup/locations',{
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
          <View>
            <View style={{paddingBottom: 40}}>
              <TouchableHighlight onPress={this.triggerCreateGameFormModal}>
              <Text style={styles.createGameStyle}>CREATE GAME!</Text>
              </TouchableHighlight>
            </View>


            <View>
            <TouchableHighlight onPress={this.closeModal}>
            <Text style={styles.closeGameStyle}> CANCEL </Text>
            </TouchableHighlight>
            </View>
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
              organizer={this.state.organizer}
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

      </MapView>


    )
  }
}

const styles = StyleSheet.create({
  createGameStyle: {
    backgroundColor: 'lightgreen',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  closeGameStyle: {
    backgroundColor: 'pink',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  modalStyle: {
    marginBottom: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    borderRadius: 4,
    height: 100,
    padding: 22
  },
  container: {
    flex: 1,
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
})

// async function getGamesFromApi() {
//   try {
//     let response = await fetch (
//       'https://baconipsum.com/api/?type=meat-and-filler',
//     );
//     let responseJson = await response.json();
//     console.log(responseJson);
//     return responseJson.games;
//   } catch (error) {
//     console.error(error);
//   }
// }
//
// getGamesFromApi()

//    const {games, loading, error} = this.state
//
//    if (loading) {
//      return (
//        <Text>
//          Loading...
//        </Text>
//      )
//    }
//
//    if (error) {
//      return (
//          <Text>
//
//            Failed to load games!
//          </Text>
//      )
//    }
//
//    return (
//      <ScrollView>
//          {this.state.games === [] && <Text>Loading games...</Text>}
//          {
//            <View>
//            <Text>printing a game!!!!</Text>
//            <Text>{this.makeGames()}</Text>
//            </View>
//          }
//      </ScrollView>
//    )
//  }
// }

export default LocationsCollection ;
