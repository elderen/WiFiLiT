//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from "react-navigation";
import { isSignedIn } from "./auth";

// create a component
class Authentication extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
    this.loadApp()
  }
  loadApp = async () => {
    const userToken = await AsyncStorage.getItem('isLoggedIn')
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.words}>Authenticating</Text>
        <ActivityIndicator size="large" color="gold" />
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
  words: {
    color: 'orange',
    margin: 18,
    fontSize: 18
  }
});

//make this component available to the app
export default Authentication;
