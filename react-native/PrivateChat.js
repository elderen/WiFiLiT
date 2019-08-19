//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class PrivateChat extends Component {
  static navigationOptions = {
    title: 'Private Messages',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Private Chat</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default PrivateChat;
