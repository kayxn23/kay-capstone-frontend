import React from "react";
import firebase from './firebase.js'; // <--- add this line

import {
  Button,
  TextInput,
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import LoginScreen from "./screens/LoginScreen";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      username: "",
      password: true,
    };
  }



    onLogin(e) {
      const { username, password } = this.state;

      Alert.alert("Credentials", `${username} + ${password}`);


      e.preventDefault();
        const itemsRef = firebase.database().ref('usernames&pws');
        const item = {
          username: this.state.username,
          password: this.state.password,
        }
        itemsRef.push(item);
        this.setState({
          username: '',
          password: ''
        });
    }



  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if (!this.state.password) {
      //if password is false then call a function that changes the home
      //screen in maintab navigtor to
      return (
        <LoginScreen
          username={this.state.username}
          password={this.state.password}
          loginCallback={this.onLogin.bind(this)}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }


_loadResourcesAsync = async () => {
  return Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free
      // to remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
};

_handleLoadingError = error => {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
  console.warn(error);
};

_handleFinishLoading = () => {
  this.setState({ isLoadingComplete: true });
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
