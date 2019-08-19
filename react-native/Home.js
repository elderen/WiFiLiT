import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput, Image } from 'react-native';


export default class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
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

  onSubmit() {

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
            enablesReturnKeyAutomatically={true}
            autoCorrect={false}
            color='black'
          />
        </View>
        <View>
          <View style={styles.button}>
            <Button
              title="Login"
              onPress={() => { this.props.navigation.navigate('SignIn', {
                username: this.state.username,
                password: this.state.password
              }) }}
              color="white"
            />
          </View>
          <View>
            <Button
              title="Sign Up"
              onPress={() => { this.props.navigation.navigate('Register') }}
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