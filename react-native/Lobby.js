//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import App from './components/App'
import AsyncStorage from '@react-native-community/async-storage';
import SocketContext from './socket-context'

// create a component
class Lobby extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }
  constructor(props) {
    super(props);
    this.state = ({
      username: 'Anon'
    })
    this.getUsernameAsyncStorage = this.getUsernameAsyncStorage.bind(this)
  }
 
  async getUsernameAsyncStorage() {
    try {
      let value = await AsyncStorage.getItem("isLoggedIn")
      await this.setState({
        username: value
      })
    } catch (err) {
      Alert.alert('Error Fetching AsyncStorage User Info')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <App socket={this.props.socket}/>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const LobbyWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Lobby navigation={props.navigation} socket={socket}/>}
  </SocketContext.Consumer>
);

export default LobbyWithSocket;
