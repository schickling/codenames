import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Dimensions } from 'react-native'
import Tile from './Tile'
import generateGame from './game-generator'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = this.newGameState()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <TextInput
            editable={true}
            onChangeText={this.setNewSeed}
            value={this.state.newSeed.toString()}
            style={{ height: 40, borderColor: '#ccc', borderWidth: 1, flex: 1, textAlign: 'center' }}
            keyboardType='number-pad'
          />
          <Button
            onPress={this.startNewGame}
            color='#324C60'
            title='New Game'
          />
          <Button
            onPress={this.toggleSpymaster}
            color='#324C60'
            title='Toggle Spymaster'
          />
        </View>
        <View style={styles.list}>
          {this.state.wordStates.map((w, i) => (
            <Tile
              kind={w.kind}
              isVisible={this.state.spymaster || w.isVisible}
              word={w.word}
              key={w.word}
              onPress={() => this.reveal(i)}
            />
          ))}
        </View>
      </View>
    )
  }

  reveal = (index: number) => {
    const wordStates = this.state.wordStates.slice(0)
    wordStates[index].isVisible = true

    this.setState({ wordStates })
  }

  newGameState = () => {
    const seed = !this.state || this.state.seed === this.state.newSeed
      ? Math.floor(Math.random() * 100000)
      : this.state.newSeed

    return {
      seed,
      newSeed: seed,
      wordStates: generateGame(seed),
      spymaster: false,
    }
  }

  setNewSeed = (text) => {
    const newSeed = text === '' ? text : parseInt(text, 10)
    this.setState({ newSeed: newSeed })
  }

  startNewGame = () => {
    Keyboard.dismiss()
    this.setState({ ...this.newGameState() })
  }

  toggleSpymaster = () => {
    Keyboard.dismiss()
    this.setState({ spymaster: !this.state.spymaster })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  list: {
    flex: 7,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
})
