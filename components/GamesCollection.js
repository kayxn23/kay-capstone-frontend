import React, { Component } from 'react';
import Game from './Game';

import { AppRegistry, View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'

import axios from 'axios';

class GamesCollection  extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      error: false,
      games: [],
    }
  }


//   componentDidMount = async () => {
//     const myHeaders = new Headers({
//     'Content-Type': 'application/json'});
//   try {
//     let response = await fetch('http://192.168.0.12:19000//games',
//     myHeaders)
//     let games = await response.json()
//     this.setState({loading: false, games})
//   } catch (e) {
//     console.log(e);
//     this.setState({loading: false, error: true})
//   }
// }

componentDidMount = async () => {
  try {
    let response = await fetch('http://192.168.0.12:8080//games',{
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

renderGame = ({id, organizer, location}, i) => {
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
          {organizer}
        </Text>
        <Text style={styles.postBody}>
          {location}
        </Text>
      </View>
    </View>
  )
}




//  makeGames = () => {
//   return this.state.games.map( (game) => {
//     return <Game key={game.id} organizer={game.organizer} />
//   });
// }


 render() {
   const {games, loading, error} = this.state

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
  <ScrollView style={styles.container}>
    {games.map(this.renderGame)}
  </ScrollView>
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

export default GamesCollection ;
