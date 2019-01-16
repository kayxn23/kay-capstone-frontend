import { Formik } from 'formik';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextInput, View, StyleSheet, DatePickerIOS, Label, Select } from 'react-native';


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
      <View onSubmit={this.onSubmit} name="new-card-form" id="new-card-form" className="new-card-form">
        <View className="new-card-form__form">
          <Label className="new-card-form--label" htmlFor="Text">Text</Label>
          <TextInput name="text" placeholder="write text here" onChange={this.onFormChange} value={this.state.text} />
          <Label className="new-card-form--label" htmlFor="species">Emoji</Label>
          <Select name="emoji" placeholder="" onChange={this.onFormChange} value={this.state.emoji}>
          {this.emojiDropDown()}
          </Select>


        <input className="new-card-form__form-button" type="submit" name="submit" value="Add a Card" />
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
  rootInput: {
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
});

export default NewGameForm;
