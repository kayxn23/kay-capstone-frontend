import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
// import Modal from "react-native-modal";


import { ScrollView, Modal, TouchableHighlight, TouchableOpacity,Button, View, Text, ActivityIndicator, StyleSheet } from 'react-native'


class GamesCollection  extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      error: false,
      games: [],
      displayModal: false
    }
  }

  // _toggleModal = () =>
  // this.setState({ displayModal: !this.state.displayModal });

  triggerModal() {
    this.setState({displayModal: true});
  }

  closeModal = () => {
    this.setState({displayModal:false});
  }

  componentDidMount = async () => {
    try {
      ///school 172.24.25.138:8080
      //home 192.168.0.12:8080
      let response = await fetch('http://172.24.25.138:8080/sspickup/games',{
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

  renderGame = ({id, title, location}, i) => {
    return (
      <View
      key={id}
      style={styles.post}>
      <View style={styles.postNumber}>
      <Text>
      {i + 1}
      </Text>
      </View>
      <View style={styles.postContent}>
      <Text>
      {title}
      </Text>
      <Text style={styles.postBody}>
      {location.latitude + ", " + location.longitude}
      </Text>
      </View>
      </View>
    )
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
      {this.state.games.map(game => (
        <Marker
          key={game.game_id}
          coordinate={game.location}
          title={game.title}
          description={game.description}
          onPress = { () => this.triggerModal() }
        />
      ))}

        <View>
          <Modal
              transparent={false}
              visible={this.state.displayModal}
          >
            <View>
              <Text>I am the modal content!</Text>
              <TouchableHighlight onPress={this.closeModal}>
              <Text>Hide me!</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>

      </MapView>
    )
  }
}

const styles = StyleSheet.create({
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


//      <ScrollView>
//          {this.state.games === [] && <Text>Loading games...</Text>}
//          {
//            <View>
//            <Text>printing a game!!!!</Text>
//            <Text>{this.makeGames()}</Text>
//            </View>
//          }
//      </ScrollView>


export default GamesCollection ;
