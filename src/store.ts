import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import saga from './saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  // if (process.env.NODE_ENV === 'development') {
  //   const { logger } = require('redux-logger');
  //   middlewares.push(logger);
  // }

  const store = createStore(reducer, applyMiddleware(...middlewares));
  sagaMiddleware.run(saga);

  return store;
};

const store = configureStore();

export default store;
