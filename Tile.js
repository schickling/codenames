// @flow
import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { WordState } from './game-generator'

export default class Tile extends React.Component<WordState | { onPress: () => void }> {

  render() {
    const viewStyle = this.props.isVisible
      ? { backgroundColor: getColor(this.props.kind) }
      : {}
    const textStyle = this.props.isVisible
      ? { color: '#fff' }
      : { color: '#111' }

    return (
      <TouchableHighlight style={[styles.container, viewStyle]} onPress={this.props.onPress}>
        <Text style={[textStyle, { fontSize: 10 }]}>{this.props.word}</Text>
      </TouchableHighlight>
    );
  }
}

function getColor(kind: string): string {
  return {
    'blue': '#4183CC',
    'red': '#D13030',
    'neutral': '#EDE2CC',
    'bomb': '#000',
  }[kind]
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '20%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
