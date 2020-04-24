import { StyleSheet } from 'react-native';

import Colors from 'styles/colors';

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  backContainer: {
    backgroundColor: Colors.BLUE_PRIMARY,
    borderColor: Colors.WHITE,
    borderWidth: 3,
    backfaceVisibility: 'hidden',
  },
  backText: {
    color: Colors.WHITE,
    fontSize: 48,
  },
  frontContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.WHITE,
    backfaceVisibility: 'hidden',
  },
  frontText: {
    color: Colors.BLACK,
    fontSize: 24,
  },
});
