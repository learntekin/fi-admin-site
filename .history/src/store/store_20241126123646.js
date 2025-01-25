// store.js
import { createStore, applyMiddleware } from 'redux';  // Import applyMiddleware
import rootReducer from './rootReducer'; 
import thunk from 'redux-thunk';  // Import redux-thunk

const store = createStore(rootReducer, applyMiddleware(thunk));  // Apply redux-thunk middleware

export default store;
