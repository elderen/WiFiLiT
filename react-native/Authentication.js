//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { isSignedIn } from "./auth";

// create a component
class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => {
          isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert("An error with checking Authentication occurred"));
        }} />
        <Text>Authentication</Text>
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
});

//make this component available to the app
export default Authentication;
