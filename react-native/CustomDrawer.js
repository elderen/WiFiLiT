import React from 'react'
import { Container, Content, Header, Body, Icon, Button } from 'native-base'
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
      <Header style={{height:200, backgroundColor: 'darkgray'}}>
        <Body>
          <Image style={styles.drawerImage} source={require('./images/iconBlack.png')} />
          <Text style = {styles.username}>{username}</Text>
        </Body>
      </Header>
      <Content style={{backgroundColor: 'darkgray'}}>
        <Button full light >
          <Text>Button</Text>
        </Button>
        <DrawerItems {...props} />
      </Content>
    </Container>
  )
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkgray',
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