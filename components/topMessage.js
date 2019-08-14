window.navigator.userAgent = 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bubble from './bubble'

export default class TopMessage extends React.Component {
  state = {

  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    return (
      <View>
        <Bubble user={this.props.user} message ={this.props.message}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
});