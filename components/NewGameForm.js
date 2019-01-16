import { Formik } from 'formik';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, TextInput, View, StyleSheet, DatePickerIOS, Label, Select } from 'react-native';


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





    onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

    onSubmit = (event) => {
    event.preventDefault();

    if (this.state.text === '') return;

    console.log(event);
    this.props.addGameCallback(this.state);
    this.resetState();
  }



    render() {
    return (
      <View onSubmit={this.onSubmit}  >
        <View >
          <Text>Title</Text>
          <TextInput
            placeholder="title"
            onChange={this.onFormChange}
            value={this.state.title}
            style={{ height: 100, width: 300 }}
          />
          <Text>Description</Text>
          <TextInput
            placeholder="description"
            onChange={this.onFormChange}
            value={this.state.description}
            style={{ height: 100, width: 300 }}
          />
          <DatePickerIOS
              date={this.state.gameDate}
              onDateChange={this.setDate}
              style={{ height: 100, width: 300 }}
            />

        <Button
          title="Submit"
          onPress={this.handleSubmit} />
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
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
  });
export default NewGameForm;
