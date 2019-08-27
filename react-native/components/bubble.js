window.navigator.userAgent = 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Bubble extends React.Component {
  state = {}
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.bubble}>
        <Text style={styles.message}> {this.props.user}: {this.props.message} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bubble: {
    alignSelf: 'baseline', 
    backgroundColor: 'whitesmoke',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'black',
    color: 'green',
    marginHorizontal: 12,
    marginBottom: 4,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  message: {

  }
});