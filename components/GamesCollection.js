import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { FlatList, ActivityIndicator, Button, Alert} from 'react-native';
import { ListItem} from 'react-native-elements';
import firebase from 'firebase';
import {Header} from 'react-native-elements'

import {
  Modal,
  View,
  Text,
  StyleSheet } from 'react-native'


class GamesCollection  extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      error: false,
      games: [],
      gamesByLocation: [],
      displayModalGamesList: false,
      joinButtonStatus: false,
      disabledHash : {}
    }
  }

  disableJoinGameButton = () => {
    this.setState({
      joinButtonStatus: true
    })
  }

// at some point once auth is set up pass the player object
  joinGameCallback = (gameId, locationId) => {
    console.log('this is the game id', gameId);
    console.log("collection props", this.props);
    const player = this.props.player;
    const disableJoinGameButton = this.disableJoinGameButton
    const getGamesFromServer = this.getGamesFromServer
    this.setState((props, prevState) => {
      return {disabledHash : {...prevState.disabledHash, [gameId]: true}}
    })
    console.log("logging this.state.disabledhash",this.state.disabledHash);

    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
    axios.patch('https://seattle-soccer-pickup.herokuapp.com/kickit/games/' + gameId + '/join',
                player,
                {headers: {'X-login-token': idToken}}
               )
        .then((response) => {
          console.log("what is? logging joinGameCallback response.data",response.data);

          disableJoinGameButton()

          //create function here that calls games by location function
          getGamesFromServer(locationId);
        })
        .catch((error) => {
          console.log("printing error mesg", error);
          if(error){
            Alert.alert("you have already joined this game.");
          } else {
            Alert.alert("successfully joined! ");
          }
        });
      });
  }

  renderSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'

        }}
        />
    )
  }

  renderHeader = () => {
    return (
      <Header
        leftComponent={{ icon: 'event', color: '#fff' }}
        centerComponent={{ text: 'Games at this Location', style: { color: '#fff' } }}
        rightComponent={{ icon: 'close', color: '#fff', onPress:() => this.closeModal()}}
      />
    )
  }


   getGamesByLocation = (updatedData) => {
    this.setState({
      gamesByLocation: updatedData,
    });
  }

  getGamesFromServer = (locationId) => {
    const getGamesByLocation = this.getGamesByLocation
    axios.get('https://seattle-soccer-pickup.herokuapp.com/kickit/games?location_id=' + locationId)
        .then((response) => {
          console.log("logging response.data from get games by loc_id",response.data);

          getGamesByLocation(response.data)

        })
        .catch((error) => {
          this.setState({
            error: error.message,
          })
        });
  }

  triggerModal(locationId) {
    this.getGamesFromServer(locationId);
    this.setState({displayModalGamesList: true});
  }

  closeModal = () => {
    this.setState({displayModalGamesList:false});
  }



  componentDidMount = async () => {
    try {
      ///school 192.168.1.34:8080
      //home 192.168.0.12:8080
      //cody 192.168.1.34
      let response = await fetch('https://seattle-soccer-pickup.herokuapp.com/kickit/games',{
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        }
      })
      let games = await response.json()
      this.setState({loading: false, games})
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

    console.log("logging this.sate.getGamesByLocation in games collection", this.state.gamesByLocation);

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
      {this.state.games.map(game => (
        <Marker
          key={game.game_id}
          coordinate={game.location}
          title={game.location.location_title}
          description={"Games at this location:" + this.state.gamesByLocation.length}
          onPress = { () => this.triggerModal(game.location.id) }
        />
      ))}

        <View >
          <Modal
              transparent={false}
              animationType="slide"
              visible={this.state.displayModalGamesList}
          >
          <View style={styles.gameListStyle}>
            <View>
                <FlatList
                  data={this.state.gamesByLocation}
                  renderItem={({item}) => (
                    <ListItem
                      title={item.title + item.description}
                      titleStyle={{fontWeight: 'bold'}}
                      subtitle={item.game_date.slice(0, -6)}
                      rightSubtitle={item.players.length + " players"}
                      rightIcon={<Button
                                          title='JOIN'
                                          color='#0C8346'
                                          disabled={item.game_id in this.state.disabledHash}
                                          onPress={() => this.joinGameCallback(item.game_id,
                                                                               item.location.id
                                                                               )}/>}
                    />
                  )}
                  keyExtractor={(item) => item.game_id}
                  ItemSeparatorComponent={this.renderSeperator}
                  ListHeaderComponent={this.renderHeader}
                />
            </View>
            </View>
          </Modal>
        </View>

      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle:{
    marginTop: 400,
    width: 375 * 0.75,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998'
  },
  modalStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
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
})



export default GamesCollection ;
