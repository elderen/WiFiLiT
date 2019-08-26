//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Settings',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black'
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async () => {
    await AsyncStorage.removeItem('isLoggedIn')
    this.props.navigation.navigate('AuthLoading')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.words}>Setting</Text>
        <Button
          title="Log Out"
          onPress={() => {this.onSubmit()}}
          color="white"
        />
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
export default Setting;
