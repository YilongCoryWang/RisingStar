import React from 'react';
import { render } from 'react-dom';
import { combineReducers , createStore , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import investReducer from './reducers/investReducer.js';
import logInUpReducer from './reducers/logInUpReducer.js';
import App from './components/App.js';

const store = createStore(
    combineReducers({
        investReducer,
        logInUpReducer,
        routing: routerReducer
    }),
    applyMiddleware(createLogger(),thunk)
);

const history = createBrowserHistory()
render(
    <Provider store={store} history={history}>
        <Router>
            <App></App>
        </Router>
    </Provider>
    ,
    document.getElementById("container")
);
