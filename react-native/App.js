//import liraries
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from "react-navigation";
import CustomDrawer from './CustomDrawer'
import Authentication from './Authentication'
import HomeWithSocket from './Home'
import SignUpWithSocket from './SignUp'
import Lobby from './Lobby'
import PasswordHelp from './PasswordHelp'
import Profile from './Profile'
import Setting from './Setting'
import PrivateChat from './PrivateChat'
import SocketContext from './socket-context'
import io from 'socket.io-client/dist/socket.io';
import { StatusBar } from 'react-native'

// Single Socket instance shared throughout app
// socket = io("https://wich.herokuapp.com/");
// socket = io('http://ec2-18-215-242-151.compute-1.amazonaws.com')
socket = io('http://localhost:3000')

// React Navigation
const StackNavigator = createStackNavigator(
  {
    Welcome: {
      screen: HomeWithSocket,
      navigationOptions: {
        header: null
      },
    },
    SignUp: {
      screen: SignUpWithSocket,
      navigationOptions: {
        headerTitle: 'Sign Up',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black'
        }
      }
    },
    Password: PasswordHelp
  },
  {
    mode: 'card',
    headerMode: 'screen'
  }
);

const MyApp = createDrawerNavigator(
  {
    Lobby: Lobby
  },
  {
    initialRouteName: 'Lobby',
    contentComponent: CustomDrawer
  })

// Main App: Lobby and Private Chat
const SwipeableNavigator = createMaterialTopTabNavigator(
  {
    Left: MyApp,
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
      <SocketContext.Provider value={socket}>
        <StatusBar hidden={true} />
        <AppContainer />
      </SocketContext.Provider>
    );
  }
}