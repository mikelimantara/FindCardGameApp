import { action } from 'typesafe-actions';

import ActionTypes from './actionTypes';

export const resetGame = () => action(ActionTypes.RESET_GAME);

export const flipAllCardsToBack = () =>
  action(ActionTypes.FLIP_ALL_CARDS_TO_BACK);

export const flipCard = (index: number) =>
  action(ActionTypes.FLIP_CARD, { index });

export const matchTwoCards = () => action(ActionTypes.MATCH_TWO_CARDS);

export const lockFlip = () => action(ActionTypes.LOCK_FLIP);
