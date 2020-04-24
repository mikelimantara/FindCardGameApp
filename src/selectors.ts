import { AppState } from './types';

export const selectCards = (appState: AppState) => appState.cards;
export const selectStepCount = (appState: AppState) => appState.stepCount;
export const selectFlippedState = (appState: AppState) => appState.flipped;

export const selectCardsToMatch = (appState: AppState) => [
  appState.firstCardIndex,
  appState.secondCardIndex,
];

export const selectIsGameWon = (appState: AppState) => appState.win;
