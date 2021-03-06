import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
  DatePickerIOS,
  } from 'react-native';
import {Header} from 'react-native-elements'

//import DatePickerIOS from 'react-native-universal-datepicker-ios';
//               dateFormat={"yyyy-MM-dd HH:mm:ss Z"}
//dateFormat={"yyyy-MM-dd HH:mm:ss Z"}

//              onConfirm={this.handleDate}



  class NewGameForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        title: '',
        description: '',
        location: this.props.location,
        game_date: new Date()
      };

      this.setDate = this.setDate.bind(this);
    }


    setDate(newDate) {
      this.setState({game_date: newDate})
    }

    onSubmit = (event) => {
      event.preventDefault();

      if (this.state.title === '' || this.state.description === '') return;

      console.log(event);
      this.props.addGameCallback(this.state);
      console.log('what is this.state?', this.state);
      this.resetState();
    }

      resetState = () => {
        this.setState({
          title: '',
          description: '',
          location: {},
          game_date: new Date()
      });
    }




    render() {
      console.log("MY FORM HAS", this.props);
    return (
      <View onSubmit={this.onSubmit}  >
        <Header
          centerComponent={{ text: 'New Game', style: { color: '#fff' } }}
          rightComponent={{ icon: 'close', color: '#fff', onPress:() => this.props.closeModal()}}
        />
        <View style={{padding: 20}}>
          <TextInput
            placeholder="Title"
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            style={{ height: 100, width: 300 }}
          />
          <TextInput
            placeholder="Description"
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
            style={{ height: 100, width: 300 }}
          />

          <DatePickerIOS
            date={this.state.game_date}
            onDateChange={this.setDate}
            style={{ height: 150, width: 300 }}
          />


          <TouchableHighlight style={styles.buttonstyle} onPress={this.onSubmit}>
          <Text style={styles.buttontextstyle}> CREATE GAME </Text>
          </TouchableHighlight>
          </View>
        </View>

    );
  }

  } //end of class

  NewGameForm.propTypes = {
    location: PropTypes.object.isRequired,
    organizer: PropTypes.object.isRequired,
    addGameCallback: PropTypes.func.isRequired
  };



  const styles = StyleSheet.create({
  buttonstyle: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 100,
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
    container: {
      justifyContent: 'center',
      marginTop: 50,
      backgroundColor: '#ffffff',
    },
  });
export default NewGameForm;
