// faqReducer.js
const initialState = {
    faqs: [],
    loading: false,
    error: null,
  };
  
  const faqReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_FAQS_SUCCESS":
        return {
          ...state,
          faqs: action.payload, // Storing fetched FAQs in the state
          loading: false,
        };
      case "CREATE_FAQ":
        return {
          ...state,
          faqs: [...state.faqs, action.payload], // Add new FAQ to the state
        };
      case "UPDATE_FAQ":
        return {
          ...state,
          faqs: state.faqs.map((faq) =>
            faq.id === action.payload.id ? action.payload : faq
          ), // Update the FAQ based on the ID
        };
      case "DELETE_FAQ":
        return {
          ...state,
          faqs: state.faqs.filter((faq) => faq.id !== action.payload), // Remove the FAQ by ID
        };
      default:
        return state;
    }
  };
  
  export default faqReducer;
  