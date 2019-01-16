import { Formik } from 'formik';
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
        location: props.location,
        organizer: props.organizer,
        gameDate: new Date()
      };

      this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
      this.setState({gameDate: newDate})
    }


      resetState = () => {
        this.setState({
          title: '',
          description: '',
          location: '',
          organizer: '',
          gameDate: ''
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
              date={this.state.gameDate}
              onDateChange={this.setDate}
              style={{ height: 150, width: 300 }}
            />

          <TouchableHighlight style={styles.buttonstyle} onPress={this.handleCreateForm}>
          <Text style={styles.buttontextstyle}> CREATE GAME </Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

  } //end of class

  NewGameForm.propTypes = {
    location: PropTypes.object.isRequired,
    organizer: PropTypes.object.isRequired
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
