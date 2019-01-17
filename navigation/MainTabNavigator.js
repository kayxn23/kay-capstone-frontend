import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LocationsScreen from '../screens/LocationsScreen';
import GamesScreen from '../screens/GamesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

import {TabNavigator} from 'react-navigation';





const WelcomeStack = createStackNavigator({
  Welcome: WelcomeScreen,
});


const LocationsStack = createStackNavigator({
  Home: LocationsScreen,
});

LocationsStack.navigationOptions = {
  tabBarLabel: 'Locations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-pin' : '-outline'}
    />
  ),
};



const GamesStack = createStackNavigator({
  Links: GamesScreen,
});

GamesStack.navigationOptions = {
  tabBarLabel: 'Games',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-football' : 'md-link'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Settings: SettingsScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? "md-happy" : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  LocationsStack,
  GamesStack,
  AccountStack,
});
