//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import App from './components/App'

// create a component
class Lobby extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
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
export default Lobby;
