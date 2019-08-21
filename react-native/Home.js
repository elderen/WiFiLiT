import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io';

const userInfo = { username: 'Admin', password: 'Pass' }

class Home extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      username: 'Anon',
      password: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.authenticate = this.authenticate.bind(this);
    socket = io('http://localhost:3000')
  }

  authenticate = async () => {
    let data = { username: this.state.username, password: this.state.password }
    await socket.emit('signin', data)
    socket.on('loginResult', async (loginResult) => {
      if (loginResult === "allow") {
        await AsyncStorage.setItem('isLoggedIn', 1);
        this.props.navigation.navigate('Lobby', { username: this.state.username })
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
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./images/logo.png')}
        />
        <Text style={styles.title}>WiFi LiT</Text>
        <View style={styles.inputContainer}>
          <TextInput
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
          />
          <TextInput
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
      </View>
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
    width: 400,
    height: 400
  },
  title: {
    color: 'gold',
    fontSize: 60,
    fontWeight: 'bold',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  inputContainer: {
    width: '80%',
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
    width: 120
  }
});

export default Home