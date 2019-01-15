import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';


import { View, Text, ActivityIndicator, StyleSheet} from 'react-native'


class LocationsCollection  extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      error: false,
      locations: [],
    }
  }


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
        />
      ))}

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
