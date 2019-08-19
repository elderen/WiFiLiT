//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class SignIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SignIn</Text>
        {/* <Text>{JSON.stringify(this.props.navigation)}</Text> */}
        <Text>{this.props.navigation.state.params.username}</Text>
        <Text>{this.props.navigation.state.params.password}</Text>
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
export default SignIn;
