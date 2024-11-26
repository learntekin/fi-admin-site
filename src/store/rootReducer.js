// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers if needed
});

export default rootReducer;
