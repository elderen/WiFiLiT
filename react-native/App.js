//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, createMaterialTopTabNavigator, NavigationEvents } from "react-navigation";
import Loading from './Loading'
import Authentication from './Authentication'
import Home from './Home'
import SignIn from './SignIn'
import Register from './Register'
import Dashboard from './Dashboard'
import PasswordHelp from './PasswordHelp'

const AppSwitchNavigator = createSwitchNavigator(
  {
    Welcome: { screen: Home },
    Dashboard: { screen: Dashboard }
  }
)


// React Navigation
const AppNavigator = createStackNavigator(
  {
    Home: Home,
    SignIn: SignIn,
    Register: Register,
    Password: PasswordHelp
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'gold'
      }
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    Loading: Loading,
    Dashboard: Dashboard,
    Auth: Authentication
  },
  {
    initialRouteName: "Auth",
    tabBarOptions: {
      style: { display: "none" }
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'gold'
      }
    }
  }
)

const SwipeableNavigator = createMaterialTopTabNavigator(
  {
    Left: Home,
    Middle: Loading,
    Right: Authentication
  },
  {
    initialRouteName: "Middle",
    swipeEnabled: true,
    tabBarOptions: {
      style: { display: "none" }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

// Main App
export default class App extends Component {

  render() {
    return (
      <AppContainer theme="dark" />
    );
  }
}