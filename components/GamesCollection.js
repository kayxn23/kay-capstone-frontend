import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { FlatList, ActivityIndicator, Button} from 'react-native';
import {List, ListItem, SearchBar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import {
  Modal,
  TouchableHighlight,
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
      displayModal: false
    }
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
      <SearchBar placeholder="Type here.." lightTheme round  />
    )
  }

  renderFooter = () => {
    //if (!this.state.loading) return null;
    return (
      <View
        style={{
               borderTopWidth: 10,
               borderTopColor: '#CED0CE'}}>
        {/*/<ActivityIndicator animating size="large"/>*/}

        <TouchableHighlight onPress={this.closeModal}>
        <Text style={{backgroundColor: 'pink', justifyContent: 'center'}}> CLOSE MODAL </Text>
        </TouchableHighlight>

      </View>
    )
  }

  triggerModal(locationId) {
    this.setState({displayModal: true});

    axios.get('http://172.24.25.138:8080/sspickup/games?location_id=' + locationId)
        .then((response) => {
          console.log("logging response.data from get games by loc_id",response.data);

          this.setState({
            gamesByLocation: response.data,
          });
        })
        .catch((error) => {
          console.log("printing error mesg", error);
          this.setState({
            error: error.message,
          })
        });
  }

  closeModal = () => {
    this.setState({displayModal:false});
  }



  componentDidMount = async () => {
    try {
      ///school 172.24.25.138:8080
      //home 192.168.0.12:8080
      //cody 192.168.1.34
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
          onPress = { () => this.triggerModal(game.location.id) }
        />
      ))}

        <View >
          <Modal
              transparent={false}
              animationType="slide"
              visible={this.state.displayModal}
          >
          <View style={styles.gameListStyle}>
            <View>
                <FlatList
                  data={this.state.gamesByLocation}
                  renderItem={({item}) => (
                    <ListItem
                      roundAvatar
                      title={item.title}
                      subtitle={item.description}
                      leftIcon={{name: 'event'}}
                    />
                  )}
                  keyExtractor={(item) => item.game_id}
                  ItemSeparatorComponent={this.renderSeperator}
                  ListHeaderComponent={this.renderHeader}
                  ListFooterComponent={this.renderFooter}
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
  gameListStyle: {

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
