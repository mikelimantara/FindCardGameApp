import React, { memo, useRef, useEffect } from 'react';
import { TouchableOpacity, Platform, View, Text, Animated } from 'react-native';

import styles from './styles';

interface Props {
  text: number;
  height: number;
  showBack: boolean;
  onFlipCard: () => void;
}

const Card: React.FC<Props> = ({ text, height, showBack, onFlipCard }) => {
  const animatedValue = new Animated.Value(180);
  const animatedValueRef = useRef(animatedValue);

  const frontInterpolate = animatedValueRef.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const backInterpolate = animatedValueRef.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backToFrontAnimatedStyle =
    Platform.OS === 'ios'
      ? {
          transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
        }
      : {
          transform: [{ rotateY: frontInterpolate }],
        };
  const frontToBackAnimatedStyle =
    Platform.OS === 'ios'
      ? {
          transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
        }
      : {
          transform: [{ rotateY: backInterpolate }],
        };

  useEffect(() => {
    if (showBack) {
      // Flip the card to the front
      Animated.timing(animatedValueRef.current, {
        toValue: 180,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      // Flip the card to the back
      Animated.timing(animatedValueRef.current, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [animatedValueRef, showBack]);

  return (
    <View style={[styles.cardContainer, { height }]}>
      {text !== 0 && (
        <TouchableOpacity
          style={styles.contentContainer}
          onPress={onFlipCard}
          activeOpacity={1}>
          <Animated.View
            style={[
              styles.card,
              styles.backContainer,
              backToFrontAnimatedStyle,
            ]}>
            <Text style={styles.backText}>?</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.card,
              styles.frontContainer,
              frontToBackAnimatedStyle,
            ]}>
            <Text style={styles.frontText}>{text}</Text>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(Card);
