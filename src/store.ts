import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const store = createStore(rootReducer, composeWithDevTools({})());
