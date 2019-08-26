//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client/dist/socket.io';

// create a component
class SignUp extends Component {
  static navigationOptions = {
    headerTitle: 'Sign Up',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black'
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userAlert: '',
      password1: '',
      password2: '',
      pwAlert: '',
      email: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.checkPw = this.checkPw.bind(this);
    this.validate = this.validate.bind(this);
    this.checkPwLength = this.checkPwLength.bind(this);
    // socket = io('http://localhost:3000')
    socket = io('http://ec2-18-215-242-151.compute-1.amazonaws.com')
  }

  checkPwLength() {
    if (this.state.password1.length < 6 && this.state.password1.length !== 0) {
      this.setState({
        pwAlert: "Password must be at least 6 characters"
      })
    } else {
      this.setState({
        pwAlert: ""
      })
    }
  }

  checkUserLength() {
    if (this.state.username.length < 4 && this.state.username.length !== 0) {
      this.setState({
        userAlert: "Username must be at least 4 characters"
      })
    } else {
      this.setState({
        userAlert: ""
      })
    }
  }

  checkPw() {
    if (this.state.password1 === this.state.password2) {
      return true
    } else {
      return false
    }
  }

  validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      return false;
    }
    else {
      return true
    }
  }

  onSubmit = async () => {
    let pwBool = this.checkPw()
    // if passwords match
    if (this.state.username.length >= 4) {
      if (pwBool === true) {
        // if password length is less than 6
        if (this.state.password1.length < 6) {
          Alert.alert('Password must be more than 6 characters')
        } else {
          let emailBool = this.validate()
          // if email is in correct format
          if (emailBool === true) {
            // if EVERYTHING is correct, then send request to server to create new user
            let data = { username: this.state.username, password: this.state.password1 }
            await socket.emit('signup', data)
            socket.on('newUser', (userData) => {
              // if bool = 0 then data bool was true and new user was created
              if (userData.bool === 'true') {
                Alert.alert(`Welcome ${userData.username}`, 'New user successfully created')
                this.props.navigation.navigate('AuthLoading')
              } else if (userData.bool === 'false') {
                Alert.alert("Failed", `Username "${userData.username}" is already taken!`)
                this.usernameTextInput.focus()
              }
            })
          } else {
            Alert.alert("Need to enter valid Email")
          }
        }
      } else {
        Alert.alert("Passwords must be the same")
        this.password1TextInput.focus()
      }
    } else {
      Alert.alert("Username must be at least 4 characters")
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.inputContainer}>
            <Text style={styles.words}>Username</Text>
            <Text style={styles.pwLength}>{this.state.userAlert}</Text>
            <TextInput
              ref={(input) => { this.usernameTextInput = input; }}
              style={styles.input}
              multiline={false}
              placeholder={`Username`}
              placeholderTextColor="gray"
              allowFontScaling={true}
              clearTextOnFocus={false}
              onChangeText={(value) => {
                this.setState({ username: value }, () => {
                  this.checkUserLength()
                })
              }}
              value={this.state.username}
              enablesReturnKeyAutomatically={true}
              autoCorrect={false}
              color='black'
              maxLength={36}
              autoCapitalize="none"
              keyboardAppearance="dark"
            />
            <Text style={styles.words}>Password</Text>
            <Text style={styles.pwLength}>{this.state.pwAlert}</Text>
            <TextInput
              ref={(input) => { this.password1TextInput = input; }}
              style={styles.input}
              multiline={false}
              placeholder={`Password`}
              placeholderTextColor="gray"
              allowFontScaling={true}
              clearTextOnFocus={true}
              onChangeText={(value) => {
                this.setState({ password1: value }, () => {
                  this.checkPwLength()
                })
              }}
              value={this.state.password1}
              enablesReturnKeyAutomatically={true}
              autoCorrect={false}
              color='black'
              secureTextEntry={true}
              maxLength={254}
              autoCapitalize="none"
              keyboardAppearance="dark"
            />
            <TextInput
              ref={(input) => { this.password2TextInput = input; }}
              style={styles.input}
              multiline={false}
              placeholder={`Confirm Password`}
              placeholderTextColor="gray"
              allowFontScaling={true}
              clearTextOnFocus={true}
              onChangeText={(value) => this.setState({ password2: value })}
              value={this.state.password2}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              color='black'
              secureTextEntry={true}
              maxLength={254}
              autoCapitalize="none"
              keyboardAppearance="dark"
            />
            <Text style={styles.words}>Email Address</Text>
            <TextInput
              style={styles.input}
              multiline={false}
              placeholder={`Email Address`}
              placeholderTextColor="gray"
              allowFontScaling={true}
              clearTextOnFocus={true}
              onChangeText={(value) => this.setState({ email: value })}
              value={this.state.email}
              enablesReturnKeyAutomatically={true}
              autoCorrect={false}
              color='black'
              keyboardType='email-address'
              maxLength={254}
              autoCapitalize="none"
              keyboardAppearance="dark"
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Create New Account"
                onPress={() => { this.onSubmit() }}
                color="white"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    borderColor: 'darkorange',
    borderWidth: 1,
    margin: 5,
    padding: 10
  },
  words: {
    margin: 5,
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  buttonContainer: {
    margin: 20
  },
  button: {
    margin: 15,
    backgroundColor: "darkorange",
    alignSelf: 'center',
    margin: 3,
    borderRadius: 14,
    padding: 1,
    width: 200
  },
  pwLength: {
    marginLeft: 5
  }
});

//make this component available to the app
export default SignUp;
