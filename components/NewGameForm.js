import { Formik } from 'formik';
import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';

const NewGameForm = () => (
  <Formik
    onSubmit={({ firstName, lastName }) => {
      console.log(`firstName: ${firstName}`);
      console.log(`lastName: ${lastName}`);
    }}
    render={({
      handleChange,
      handleSubmit,
      values: { firstName, lastName }
    }) => (
      <View>
        <TextInput
          onChangeText={handleChange('firstName')}
          style={styles.rootInput}
          value={firstName}
        />
        <TextInput
          onChangeText={handleChange('lastName')}
          style={styles.rootInput}
          value={lastName}
        />
        <Button
          title="Submit Simple"
          onPress={handleSubmit}
        />
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  rootInput: {
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
});

export default NewGameForm;
