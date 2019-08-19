import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default class Loading extends Component {
  static navigationOptions = {
    headerStyle:{
      backgroundColor:'blue'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading 123..</Text>
        <Button 
          title="Go to Home"
          onPress={()=>{this.props.navigation.replace('Home')}}
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