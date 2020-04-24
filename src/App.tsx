import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
} from 'react-native';

import Colors from 'styles/colors';
import CardGrid from 'components/CardGrid';

import { resetGame, flipAllCardsToBack } from 'actions';
import {
  selectCards,
  selectFlippedState,
  selectStepCount,
  selectIsGameWon,
} from 'selectors';

// Number of pairs (configurable)
export const X = 6;
export const HEADER_HEIGHT = 48;

const App = () => {
  const dispatch = useDispatch();

  const cards = useSelector(selectCards);
  const flippedState = useSelector(selectFlippedState);
  const stepCount = useSelector(selectStepCount);
  const isGameWon = useSelector(selectIsGameWon);

  const onClickRestart = useCallback(() => {
    dispatch(flipAllCardsToBack());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  useEffect(() => {
    if (isGameWon) {
      Alert.alert(
        'Congratulations!',
        `You win this game by ${stepCount} steps!`,
        [
          {
            text: 'Try another round',
            onPress: onClickRestart,
          },
        ],
      );
    }
  }, [isGameWon, stepCount, onClickRestart]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.baseContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button title="Restart" onPress={onClickRestart} />
            <View style={styles.stepsContainer}>
              <Text style={styles.stepsText}>STEPS:&nbsp;</Text>
              <Text style={styles.stepCountText}>{stepCount}</Text>
            </View>
          </View>
          {cards.length > 0 && (
            <CardGrid cards={cards} flippedState={flippedState} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: '#000000AA',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: HEADER_HEIGHT,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepsText: {
    color: Colors.WHITE,
    fontSize: 20,
  },
  stepCountText: {
    color: Colors.BLUE_PRIMARY,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
