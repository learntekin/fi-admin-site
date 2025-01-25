// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import faqReducer from "./reducers/faqReducer"; // Ensure correct import

const rootReducer = combineReducers({
  auth: authReducer,
  
  // Add more reducers if needed
});

export default rootReducer;
