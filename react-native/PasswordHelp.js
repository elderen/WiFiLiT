//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class PasswordHelp extends Component {
  static navigationOptions = {
    headerTitle: 'Forgot Your Password?'
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Too Bad</Text>
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
export default PasswordHelp;
