import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
  DatePickerIOS } from 'react-native';


  class NewGameForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        title: '',
        description: '',
        location: this.props.location,
        organizer: this.props.organizer,
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
      this.resetState();
    }


      resetState = () => {
        this.setState({
          title: '',
          description: '',
          location: '',
          organizer: '',
          game_date: ''
      });
    }


    render() {
    return (
      <View onSubmit={this.onSubmit}  >
        <View >
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
      padding: 20,
      backgroundColor: '#ffffff',
    },
  });
export default NewGameForm;
