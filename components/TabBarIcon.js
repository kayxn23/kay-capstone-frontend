import React from 'react';
import { Icon } from 'expo';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

TabBarIcon.propTypes = {
  name: PropTypes.string,
  focused: PropTypes.bool
};
