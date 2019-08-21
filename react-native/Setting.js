//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
class Setting extends Component {
  static navigationOptions = {
    headerTitle: 'Settings'
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
        <Text>Setting</Text>
        <Button
          title="Log Out"
          onPress={() => {this.onSubmit()}}
          color="black"
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
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default Setting;
