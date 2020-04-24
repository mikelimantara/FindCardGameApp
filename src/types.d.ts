import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export interface AppState {
  cards: number[];
  flipped: boolean[];
  firstCardIndex: number; // the first card to match
  secondCardIndex: number; // the second card to match
  lockFlip: boolean;
  stepCount: number;
  win: boolean;
}
