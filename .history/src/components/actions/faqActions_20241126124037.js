// faqActions.js
export const fetchFAQs = () => {
    return async (dispatch) => {
      dispatch({ type: "FETCH_FAQS_REQUEST" });  // Action indicating the start of the request
  
      try {
        const response = await fetch("https://api.example.com/faqs");  // Your API call
        const data = await response.json();  // Parse the response
  
        dispatch({ type: "FETCH_FAQS_SUCCESS", payload: data });  // Dispatch success action with the data
      } catch (error) {
        dispatch({ type: "FETCH_FAQS_ERROR", payload: error.message });  // Dispatch error action
      }
    };
  };
  