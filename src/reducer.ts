import _ from 'lodash';

import { AppState, Action } from './types';
import ActionTypes from 'actionTypes';

import { X } from './App';

const initialState: AppState = {
  cards: [],
  flipped: [],
  firstCardIndex: -1,
  secondCardIndex: -1,
  stepCount: 0,
  lockFlip: false,
  win: false,
};

const generateData = (numPairs: number) => {
  const range = [...Array(101).keys()].slice(1); // Range of number from 1 - 100
  const sample = _.sampleSize(range, numPairs);
  const numbers = [...sample, ...sample];
  return shuffle(numbers);
};

const shuffle = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.RESET_GAME: {
      return {
        ...state,
        cards: generateData(X), // generate new data
        flipped: new Array(X * 2).fill(false),
        firstCardIndex: -1,
        secondCardIndex: -1,
        stepCount: 0,
        lockFlip: false,
        win: false,
      };
    }
    case ActionTypes.FLIP_ALL_CARDS_TO_BACK: {
      return {
        ...state,
        flipped: new Array(X * 2).fill(false),
      };
    }
    case ActionTypes.FLIP_CARD: {
      const { index } = action.payload;
      const { lockFlip } = state;

      if (lockFlip) {
        return state;
      }

      const flipped = [...state.flipped];
      flipped.splice(index, 1, true);

      if (state.firstCardIndex === -1) {
        return {
          ...state,
          firstCardIndex: index,
          stepCount: state.stepCount + 1,
          flipped,
        };
      }

      if (state.firstCardIndex === index) {
        return state;
      }

      return {
        ...state,
        secondCardIndex: index,
        stepCount: state.stepCount + 1,
        flipped,
      };
    }
    case ActionTypes.LOCK_FLIP: {
      return {
        ...state,
        lockFlip: true,
      };
    }
    case ActionTypes.MATCH_TWO_CARDS: {
      const { cards, firstCardIndex, secondCardIndex } = state;
      if (firstCardIndex >= 0 && secondCardIndex >= 0) {
        const firstCard = cards[firstCardIndex];
        const secondCard = cards[secondCardIndex];
        const win = state.flipped.reduce((acc, val) => acc && val);

        if (firstCard === secondCard) {
          return {
            ...state,
            firstCardIndex: -1,
            secondCardIndex: -1,
            lockFlip: false,
            win,
          };
        }

        const flipped = [...state.flipped];
        flipped.splice(firstCardIndex, 1, false);
        flipped.splice(secondCardIndex, 1, false);
        return {
          ...state,
          firstCardIndex: -1,
          secondCardIndex: -1,
          flipped,
          lockFlip: false,
        };
      }

      return state;
    }

    default:
      return state;
  }
};

export default reducer;
