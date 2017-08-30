// @flow
import { data } from './data'
import { shuffle } from 'shuffle-seed'

export type WordState = {
  word: string,
  kind: string,
  isVisible: boolean,
}

export default function (seed: number): WordState[] {

  const words = shuffle(data, seed).slice(0, 25)

  const mappedWords = words
    .map((word, index) => {
      if (index === 0) {
        return { word, kind: 'bomb' }
      } else if (index < 8) {
        return { word, kind: 'neutral' }
      } else if (index < 16) {
        return { word, kind: 'blue' }
      } else {
        return { word, kind: 'red' }
      }
    })
    .map(w => ({ ...w, isVisible: false }))

  return shuffle(mappedWords, seed)
}