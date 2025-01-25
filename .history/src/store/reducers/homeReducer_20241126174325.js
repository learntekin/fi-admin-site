import { FETCH_COUNTS } from "../actions";

const initialState = {
  counts: {
    careersCount: 0,
    contactCount: 0,
    faqCount: 0,
  },
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTS:
      return {
        ...state,
        counts: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
