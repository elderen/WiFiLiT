import React, { Component } from 'react';
import { Keyboard, Button, View, Text, StyleSheet, TextInput, Image, Alert, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io';

class Home extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.authenticate = this.authenticate.bind(this);
    // socket = io('http://localhost:3000')
    socket = io('http://ec2-18-215-242-151.compute-1.amazonaws.com')
  }

  authenticate = async () => {
    let data = { username: this.state.username, password: this.state.password }
    await socket.emit('signin', data)
    socket.on('loginResult', async (loginResult) => {
      if (loginResult === "allow") {
        await AsyncStorage.setItem('isLoggedIn', this.state.username);
        this.props.navigation.navigate('Lobby')
      } else {
        Alert.alert(loginResult)
      }
    })
  }

  onSubmit = async () => {
    // if user and password combination exists in server database
    await this.authenticate()
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Image
            style={styles.image}
            source={require('./images/logo.png')}
          />
          <Text style={styles.title}>WiFi LiT</Text>

          <View style={styles.inputContainer}>
            <TextInput
              ref={ref => this.usernameInput = ref}
              style={styles.input}
              multiline={false}
              value={this.state.message}
              placeholder={`Username`}
              placeholderTextColor="lightgray"
              allowFontScaling={true}
              clearTextOnFocus={true}
              onChangeText={(value) => this.setState({ username: value })}
              value={this.state.username}
              enablesReturnKeyAutomatically={true}
              autoCorrect={false}
              color='black'
              autoCapitalize="none"
              keyboardAppearance="dark"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={ref => this.passwordInput = ref}
              style={styles.input}
              multiline={false}
              value={this.state.message}
              placeholder={`Password`}
              placeholderTextColor="lightgray"
              allowFontScaling={true}
              clearTextOnFocus={true}
              onChangeText={(value) => this.setState({ password: value })}
              value={this.state.password}
              enablesReturnKeyAutomatically={true}
              autoCorrect={false}
              color='black'
              secureTextEntry={true}
              autoCapitalize="none"
              keyboardAppearance="dark"
            />
          </View>
          <View>
            <View style={styles.button}>
              <Button
                title="Login"
                onPress={() => { this.onSubmit() }}
                color="white"
              />
            </View>
            <View>
              <Button
                title="Sign Up"
                onPress={() => { this.props.navigation.navigate('SignUp') }}
                color="red"
              />
              <Button
                title="Forgot Password?"
                onPress={() => { this.props.navigation.navigate('Password') }}
                color="red"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 360,
    height: 360,
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {
    color: 'gold',
    fontSize: 50,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 1,
  },
  inputContainer: {
    width: '80%',
    margin: 0,
    padding: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    padding: 10
  },
  button: {
    margin: 15,
    backgroundColor: "darkorange",
    alignSelf: 'center',
    margin: 3,
    borderRadius: 14,
    padding: 1,
    width: 120,
    borderColor: 'black',
    borderWidth: 1,
  }
});

export default Home