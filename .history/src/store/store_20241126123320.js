import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import faqReducer from "./reducers/faqReducer"; // Ensure correct import

// Combine reducers (can add more reducers in the future)
const rootReducer = combineReducers({
  faq: faqReducer, // Make sure this key matches the one used in useSelector
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
