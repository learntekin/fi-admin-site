import { FETCH_COUNTS, FETCH_COUNTS_ERROR } from '../../components/actions/actions';

const initialState = {
  counts: {
    faqCount: 0,
    careersCount: 0,
    contactCount: 0,
  },
  error: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTS:
      return {
        ...state,
        counts: action.payload, // Store the counts in the state
        error: null,
      };
    case FETCH_COUNTS_ERROR:
      return {
        ...state,
        error: action.payload, // Store any error that occurred
      };
    default:
      return state;
  }
};

export default homeReducer;
