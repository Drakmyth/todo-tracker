import React from 'react';
import ReactDOM from 'react-dom';
import './css/core.scss';
import './css/layouts.scss';
import './css/themes.scss';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { rootReducer } from './store/rootStore';
import { createStore, compose } from 'redux';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers()
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
