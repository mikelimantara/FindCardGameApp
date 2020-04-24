import React from 'react';
import { useDispatch } from 'react-redux';
import {
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
} from 'react-native';

import { HEADER_HEIGHT } from 'App';
import Card from 'components/Card';

import { flipCard } from 'actions';

interface Props {
  cards: number[];
  flippedState: boolean[];
}

const CardGrid: React.FC<Props> = ({ cards, flippedState }) => {
  const dispatch = useDispatch();

  const numCols = Math.floor(Math.sqrt(cards.length));
  const numRows = Math.ceil(cards.length / numCols);

  const { height: windowHeight } = useWindowDimensions();
  const listHeight = windowHeight - HEADER_HEIGHT - 80;

  const onClickCard = (index: number) => () => {
    dispatch(flipCard(index));
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<number>) => {
    return (
      <Card
        text={item}
        height={listHeight / numRows}
        showBack={!flippedState[index]}
        onFlipCard={onClickCard(index)}
      />
    );
  };

  const extraData = new Array(numRows * numCols - cards.length).fill(0);
  const paddedData = [...cards, ...extraData];

  return (
    <FlatList
      data={paddedData}
      renderItem={renderItem}
      keyExtractor={(_, index) => `${index}`}
      numColumns={numCols}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CardGrid;
