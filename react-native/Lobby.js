//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, NavigationEvents, Alert } from 'react-native';
import App from './components/App'
import AsyncStorage from '@react-native-community/async-storage';

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
        <App />
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

//make this component available to the app
export default Lobby
