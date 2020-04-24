import React from 'react';
import { Provider } from 'react-redux';

import App from 'App';

import store from 'store';

const AppContainer: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContainer;
