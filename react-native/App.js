//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from "react-navigation";
import Loading from './Loading'
import Home from './Home'
import Dashboard from './Dashboard'

const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{screen: Home},
  Dashboard: {screen: Dashboard}
})


// React Navigation
const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Loading: Loading
  },
  {
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      headerStyle : {
        backgroundColor: 'gold'
      }
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: Home,
    Loading: Loading,
    Dashboard: Dashboard
  },
  {
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      headerStyle : {
        backgroundColor: 'gold'
      }
    }
  }
)

const SwipeableNavigator = createMaterialTopTabNavigator({
  FrontCard: Home,
  BackCard: Loading
},
{
  swipeEnabled: true,
  tabBarOptions: {
    style: { display: "none" }
  }
});

const AppContainer = createAppContainer(SwipeableNavigator);

// Main App
export default class App extends Component {
  render() {
    return <AppContainer theme="dark"/>;
  }
}