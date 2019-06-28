window.navigator.userAgent = 'react-native';
import React, { Fragment } from 'react';
import { YellowBox, StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { NetworkInfo } from "react-native-network-info";

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


export default class LobbyChat extends React.Component {
  state = {
    message: '',
    sock: 'no socket connection',
    logs: [],
    ip: 'N/A',
    ipv4:'na'
  }
  constructor(props) {
    super(props)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
    socket = io("https://wich.herokuapp.com/");
    this.getIP = this.getIP.bind(this);
  }

  componentDidMount() {
    socket.on('update', (msg) => { this.setState({ sock: 'Websocket Connected', logs: msg }) })
    this.getIP()
  }
  
  //
  async getIP() {
    const ipAddress = await NetworkInfo.getIPAddress();
    const ipv4Address = await NetworkInfo.getIPV4Address();
    this.setState({
      ip: ipAddress, 
      ipv4: ipv4Address
    })
  }

  onSubmitEdit() {
    let newLog = { 'user': this.props.name, 'room': 'lobby', 'message': this.state.message }
    socket.send(newLog, () => {
      socket.on('update', (msg) => { this.setState({ logs: msg }) })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">

          <View style={styles.header}>
            <View style={{ height: "10%" }} />
            <Text style={{
              color: 'gold',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 40,
              bottom: 0,
              margin: 0,
              padding: 0,
            }}>WiFi LiT</Text>
            <Text style={{
              color: 'white',
              alignSelf: 'center',
              top: 0,
              margin: 0,
              padding: 0,
            }}> {this.state.sock} | {this.state.ip} | {this.state.ipv4} </Text>
          </View>
          <View style={{ flex: 16 }}>
            <ScrollView
              ref={ref => this.scrollView = ref}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({ animated: true });
              }}
            >
              <View style={styles.words}>
                {this.state.logs.map((obj, n) => {
                  let currentColor = 'white'
                  if (n % 2 === 0) {
                    currentColor = '#f5f5f5'
                  } else {
                    currentColor = 'white'
                  }
                  return <Text style={{ alignSelf: 'stretch', backgroundColor: currentColor }} key={n}>{obj.user}: {obj.message}</Text>
                })}
              </View>
            </ScrollView>
          </View>
          <TextInput
            ref={input => { this.textInput = input }}
            style={styles.textBox}
            multiline={false}
            value={this.state.message}
            placeholder={`Say something ${this.props.name}`}
            placeholderTextColor="lightgray"
            allowFontScaling={true}
            clearTextOnFocus={true}
            onChangeText={(value) => this.setState({ message: value })}
            onSubmitEditing={() => {
              this.onSubmitEdit()
              this.textInput.clear()
            }}
            enablesReturnKeyAutomatically={true}
            autoCorrect={false}
            color='white'
          />

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'black',
  },
  header: {
    flex: 2,
    marginTop: 14,
    marginBottom: 2,
  },
  words: {
    flex: 1,
    fontSize: 30,
    color: 'gold',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
  },
  textBox: {
    flex: 1,
    borderColor: 'gold',
    borderWidth: 2,
    padding: 2,
    justifyContent: 'flex-end',
  }
});
