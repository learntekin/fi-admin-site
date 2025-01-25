// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import faqReducer from "./reducers/faqReducer"; // Ensure correct import
import homeReducer from './reducers/homeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  
  // Add more reducers if needed

  faq: faqReducer, // Make sure this key matches the one used in useSelector
  home:
});

export default rootReducer;
