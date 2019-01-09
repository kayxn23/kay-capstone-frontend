import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ScrollView,
  Text,
} from 'react-native';

class Game  extends Component {


  render() {
    return (
      <ScrollView>
           <Text>{this.props.organizer}</Text>
      </ScrollView>
    )
  }
}

Game.propTypes = {
  organizer: PropTypes.string,
};

export default Game ;
