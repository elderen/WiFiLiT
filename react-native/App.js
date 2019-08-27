//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, createMaterialTopTabNavigator, NavigationEvents } from "react-navigation";
import Loading from './Loading'
import Authentication from './Authentication'
import Home from './Home'
import SignUp from './SignUp'
import Register from './Register'
import Lobby from './Lobby'
import PasswordHelp from './PasswordHelp' 
import Profile from './Profile'
import Setting from './Setting'
import PrivateChat from './PrivateChat'

// React Navigation
const StackNavigator = createStackNavigator(
  {
    Welcome: Home,
    SignUp: SignUp,
    Password: PasswordHelp
  },
  {
    mode: 'card'
  }
);

// Main Lobby with active drawer
const AppDrawerNavigator = createDrawerNavigator(
  {
    Lobby: Lobby,
    Profile: Profile,
    Setting: Setting
  }, {
    drawerPosition: 'left',
    drawerBackgroundColor: 'darkgray',
    overlayColor: 'black',
})

// Main App: Lobby and Private Chat
const SwipeableNavigator = createMaterialTopTabNavigator(
  {
    Left: AppDrawerNavigator,
    Right: PrivateChat,
  },
  {
    // unmountInactiveRoutes: true,
    initialRouteName: "Left",
    swipeEnabled: true,
    tabBarOptions: {
      style: { display: 'none' }
    },
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: Authentication,
    Auth: StackNavigator,
    App: SwipeableNavigator
  },
  {
    // unmountInactiveRoutes: true,
    initialRouteName: 'AuthLoading'
  }
)

// const SwipeContainer = createAppContainer(SwipeableNavigator);

const AppContainer = createAppContainer(SwitchNavigator);

// Main App
export default class App extends Component {

  render() {
    return (
      <AppContainer theme="dark" />
    );
  }
}