import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import GamesCollection from '../components/GamesCollection';



export default class GamesScreen extends React.Component {
  static navigationOptions = {
    title: "Games",
    headerStyle: {
      backgroundColor: '#2089dc',
    },
    headerTitleStyle: {
        color: 'white',
      },
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.fetchPlayer();
  }

  fetchPlayer = async () => {
    const player = await AsyncStorage.getItem('player');

    this.setState({player: JSON.parse(player)});
  }

  render() {
    console.log("MY STATE GAMES", this.state);
    console.log("logging this.props.navigation.getParam player from gamescreen",this.props.navigation.getParam('player', {}));

    return (
      <View style={styles.container}>
        <GamesCollection player={this.state.player}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
