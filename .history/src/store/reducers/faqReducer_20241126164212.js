import { FETCH_FAQS, ADD_FAQ, UPDATE_FAQ, DELETE_FAQ } from "../../components";

const initialState = {
  faqs: [],
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAQS:
      return { ...state, faqs: action.payload };
    case ADD_FAQ:
      return { ...state, faqs: [...state.faqs, action.payload] };
    case UPDATE_FAQ:
      return {
        ...state,
        faqs: state.faqs.map((faq) =>
          faq.id === action.payload.id ? action.payload : faq
        ),
      };
    case DELETE_FAQ:
      return {
        ...state,
        faqs: state.faqs.filter((faq) => faq.id !== action.payload),
      };
    default:
      return state;
  }
};

export default faqReducer;
