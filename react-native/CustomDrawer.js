import React, { Component } from 'react'
import { Container, Content, Header, Body, Icon, Button, Col } from 'native-base'
import { View, StyleSheet, Image, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import defaultPhoto from './images/defaultPhoto.jpg'
import SocketContext from './socket-context'

const options = {
  title: 'Dope Profile Pic',
  takePhotoButtonTitle: 'Take a LiT photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose a LiT photo from Library',
}

class MyDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: 'Anon',
      imageUri: null,
      isLoaded: false
    })
    this.changePhoto = this.changePhoto.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.getPhoto = this.getPhoto.bind(this)
    this.logOut = this.logOut.bind(this)
    this.getUserName()
  }

  getUserName = async () => {
    try {
      let storedName = await AsyncStorage.getItem("isLoggedIn")
      this.setState({
        username: storedName
      }, () => {
        this.getPhoto()
      })

    } catch (err) {
      this.setState({
        username: 'Error'
      })
    }
  }

  //getProfilePhotoFromServer
  getPhoto = () => {
    socket.emit('retrievePhoto', this.state.username)
    socket.on('retrievePhoto', (photo) => {
      if (photo) {
        let parsedPhoto = JSON.parse(photo)
        this.setState({
          imageUri: parsedPhoto
        }, () => {
          this.setState({
            isLoaded: true
          })
        })
      } else {
        this.setState({
          isLoaded: false
        })
      }
    })
  }

  //allow user to either choose a photo from their phone album, or take
  changePhoto = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.uri) {
          // const source = { uri: response.uri, username: this.state.username  };

          // You can also display the image using data:
          const source = { uri: 'data:image/jpeg;base64,' + response.data, username: this.state.username };
          this.setState({
            imageUri: source
          }, () => {
            this.props.socket.emit('postPhoto', source)
            this.setState({
              isLoaded: true
            })
          })

        }
      }
    });
  }

  logOut = async () => {
    await AsyncStorage.removeItem('isLoggedIn')
    this.props.navigation.navigate('AuthLoading')
  }

  renderImage() {
    return (
      <View>
        <Image style={styles.drawerImage} source={this.state.imageUri} />
      </View>
    );
  }

  renderLoadingScreen() {
    return (
      <View>
        <Image style={styles.drawerImage} source={defaultPhoto} />
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container} >
        <Header style={{ height: 200, backgroundColor: 'whitesmoke' }}>
          <Body>
            <TouchableOpacity onPress={this.changePhoto}>
              {this.state.isLoaded ? this.renderImage() : this.renderLoadingScreen()}
            </TouchableOpacity>
            <Text style={styles.username}>{this.state.username}</Text>
          </Body>
        </Header>
        <Content style={{ backgroundColor: 'white' }}>
          <Button full light onPress={() => { alert('will change your username color') }}>
            <Text>Change Username Color</Text>
          </Button>
          <Button full light onPress={this.getPhoto}>
            <Text>Get Photo</Text>
          </Button>
          <Button full light onPress={this.logOut}>
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  username: {
    fontSize: 30
  }
})

const CustomDrawer = props => (
  <SocketContext.Consumer>
    {socket => <MyDrawer navigation={props.navigation} socket={socket} />}
  </SocketContext.Consumer>
);

export default CustomDrawer;