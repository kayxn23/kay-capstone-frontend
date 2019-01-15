import React from 'react';
import { StyleSheet, View } from 'react-native';
import GamesCollection from '../components/GamesCollection';



export default class GamesScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };


  render() {
    return (
      <View style={styles.container}>
        <GamesCollection/>
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
