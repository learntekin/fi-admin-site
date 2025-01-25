// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  import faqReducer from "./reducers/faqReducer"; // Ensure correct import
  // Add more reducers if needed
});

export default rootReducer;
