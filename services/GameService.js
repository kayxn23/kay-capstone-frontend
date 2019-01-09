import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'


class GameService  extends Component {

  state = {
    loading: true,
    error: false,
    games: [],
  }

  UNSAFE_componentWillMount = async () => {
    try {
      const response = await fetch('http://localhost:8080/games')
      const games = await response.json()

      this.setState({loading: false, games})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }



  render() {
    const {games, loading, error} = this.state

    if (loading) {
      return (
        <View >
          <Text>Loding........</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View >
        <Text>
        Failed to load posts!
        </Text>
        </View>
      )
    }

    return (
      <ScrollView>
      {games}
      </ScrollView>
    )

  }
}

export default GameService ;
