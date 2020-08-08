import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <h1>BBS app</h1>
  </Provider>,
  document.getElementById('root')
);
