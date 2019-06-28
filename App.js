window.navigator.userAgent = 'react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  words: {
    fontSize: 30,
    color: 'orange',
  }
});
