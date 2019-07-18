window.navigator.userAgent = 'react-native';
import React from 'react';
import { YellowBox, StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { NetworkInfo } from "react-native-network-info";
import NetInfo from "@react-native-community/netinfo";

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
    ss: 'No SSID',
    bc: 'No Broadcast',
    wifiBool: 'false',
    console: 0
  }
  constructor(props) {
    super(props)
    // Function Binds
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
    this.getNetworkInfo = this.getNetworkInfo.bind(this);

    // Different Sockets
    // socket = io("https://wich.herokuapp.com/");
    socket = io('http://ec2-3-93-76-230.compute-1.amazonaws.com')
    // socket = io('http://localhost:3000')
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      (hasInternetConnection) => {
        if (hasInternetConnection === true) {
          this.getNetworkInfo()
          this.setState({
            wifiBool: 'WiFi Connected'
          })
          socket.on('update', (msg) => { this.setState({ sock: 'Websocket Connected', logs: msg }) })
        } else if (hasInternetConnection === false) {
          this.setState({
            wifiBool: 'No WiFi'
          })
        }
      }
    );
  }

  async getNetworkInfo() {
    const ipAddress = await NetworkInfo.getIPAddress();
    const ssid = await NetworkInfo.getSSID();
    const broadcast = await NetworkInfo.getBroadcast();

    socket.emit('ssid', ssid, () => {
      socket.on('update', (msg) => { this.setState({ sock: 'Websocket Connected', logs: msg}, ()=>{
        let counter = this.state.console + 1
        this.setState({
          console: counter
        })
      }) })
    })
    this.setState({
      ip: ipAddress,
      ss: ssid,
      bc: broadcast
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
            <Text style={styles.network}> {this.state.sock} </Text>
            <Text style={styles.network}> {this.state.wifiBool}: {this.state.ss} </Text>
            <Text style={styles.network}> IP: {this.state.ip}  |  Broadcast: {this.state.bc} </Text>
            <Text style={styles.network}> Console Log: {this.state.console} </Text>
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
            placeholder={`Say something LIT ${this.props.name}!`}
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
  },
  network: {
    color: 'white',
    alignSelf: 'center',
    top: 0,
    margin: 0,
    padding: 0,
  }
});
