import React, { Component } from 'react'
import { Container, Content, Header, Body, Icon, Button, Col } from 'native-base'
import { StyleSheet, Image, Text } from 'react-native'
import { DrawerItems } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';

const options = {
  title: 'Dope Profile Pic',
  takePhotoButtonTitle: 'Take a LiT photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose a LiT photo from Library',
}

export default class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: 'Anon'
    })
    this.changePhoto = this.changePhoto.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.logOut = this.logOut.bind(this)
    this.getUserName()
  }

  getUserName = async () => {
    try {
      let storedName = await AsyncStorage.getItem("isLoggedIn")
      this.setState({
        username: storedName
      })
      
    } catch (err) {
      this.setState({
        username: 'Error'
      })
    }
  }

  changePhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  }

  logOut = async () => {
    await AsyncStorage.removeItem('isLoggedIn')
    this.props.navigation.navigate('AuthLoading')
  }

  render () {
  return(
    <Container style = { styles.container } >
      <Header style={{ height: 200, backgroundColor: 'whitesmoke' }}>
        <Body>
          <TouchableOpacity onPress={this.changePhoto}>
            <Image style={styles.drawerImage} source={require('./images/iconBlack.png')} />
          </TouchableOpacity>
          <Text style={styles.username}>{this.state.username}</Text>
        </Body>
      </Header>
      <Content style={{ backgroundColor: 'white' }}>
        <Button full light onPress={() => { alert('one') }}>
          <Text>Change Text</Text>
        </Button>
        <Button full light onPress={() => { alert('two') }}>
          <Text>Button</Text>
        </Button>
        <Button full light onPress={this.logOut}>
          <Text>Log Out</Text>
        </Button>
        {/* <DrawerItems {...props} /> */}
      </Content>
    </Container>
  )}
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