window.navigator.userAgent = 'react-native';
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Prompt from 'rn-prompt';
import LobbyChat from './lobbyChat.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Anon',
      promptVisible: true
    };
  }
  componentDidMount = () => {
    this.setState({
      promptVisible: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./blackBG.jpg')}
          style={{ width: '100%', height: '100%' }}
          resizeMode='repeat'
        >
          <LobbyChat name={this.state.name} />

          <Prompt
            title="What is Your Username"
            onSubmit={(data) => {
              if (data !== '') {
                this.setState({
                  name: data,
                  promptVisible: false
                })
              } else {
                this.setState({
                  promptVisible: false
                })
              }
            }}
            onCancel={() => {
              this.setState({
                name: 'Anon',
                promptVisible: false
              })
            }}
            visible={this.state.promptVisible}
            placeholder="Anonymous"
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  words: {
    fontSize: 30,
    color: 'orange',
  }
});
