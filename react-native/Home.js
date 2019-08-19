import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Home</Text>
        <Button 
          title="Login"
          onPress={()=>{this.props.navigation.navigate('Loading')}}
        />
        <Button 
          title="Sign Up"
          onPress={()=>{this.props.navigation.replace('Loading')}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});