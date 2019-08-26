//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black'
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.words}>Profile</Text>
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
    backgroundColor: 'black',
  },
  words: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

//make this component available to the app
export default Profile;
