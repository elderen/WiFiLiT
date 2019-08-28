import React from 'react'
import { Container, Content, Header, Body, Icon, Button, Col } from 'native-base'
import { StyleSheet, Image, Text } from 'react-native'
import { DrawerItems } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

let username;
let getUserName = async () => {
  try {
    username = await AsyncStorage.getItem("isLoggedIn")
  } catch (err) {
    username = 'Anonymous'
  }
}
getUserName()

export default CustomDrawer = (props) => {
  return (
    <Container style={styles.container}>
      <Header style={{height:200, backgroundColor: 'whitesmoke'}}>
        <Body>
          <Image style={styles.drawerImage} source={require('./images/iconBlack.png')} />
          <Text style = {styles.username}>{username}</Text>
        </Body>
      </Header>
      <Content style={{backgroundColor: 'white'}}>
        <Button full light onPress={()=>{alert('one')}}>
          <Text>Change Text</Text>
        </Button>
        <Button full light onPress={()=>{alert('two')}}>
          <Text>Button</Text>
        </Button>
        <Button full light onPress={()=>{alert('three')}}>
          <Text>Log Out</Text>
        </Button>
        <DrawerItems {...props} />
      </Content>
    </Container>
  )
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