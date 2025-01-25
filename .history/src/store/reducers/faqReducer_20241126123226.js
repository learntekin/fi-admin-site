const initialState = {
    faqs: [], // Initialize faqs as an empty array
    loading: true,
    error: null,
  };
  
  const faqReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_FAQS_SUCCESS":
        return { ...state, faqs: action.payload, loading: false };
      case "FETCH_FAQS_ERROR":
        return { ...state, error: action.payload, loading: false };
      case "CREATE_FAQ_SUCCESS":
        return { ...state, faqs: [...state.faqs, action.payload] };
      case "CREATE_FAQ_ERROR":
        return { ...state, error: action.payload };
      case "UPDATE_FAQ_SUCCESS":
        return {
          ...state,
          faqs: state.faqs.map(faq =>
            faq.id === action.payload.id ? action.payload : faq
          ),
        };
      case "UPDATE_FAQ_ERROR":
        return { ...state, error: action.payload };
      case "DELETE_FAQ_SUCCESS":
        return {
          ...state,
          faqs: state.faqs.filter(faq => faq.id !== action.payload),
        };
      case "DELETE_FAQ_ERROR":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default faqReducer;
  