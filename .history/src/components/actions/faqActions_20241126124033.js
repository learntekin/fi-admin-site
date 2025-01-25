// actions.js
export const createFAQ = (newFAQ) => {
    return async (dispatch) => {
      try {
        const response = await fetch("https://api.example.com/faqs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFAQ),
        });
        const data = await response.json();
        dispatch({ type: "CREATE_FAQ", payload: data }); // Add the new FAQ to the state
      } catch (error) {
        console.error("Error creating FAQ:", error);
      }
    };
  };
  
  export const fetchFAQs = () => {
    return async (dispatch) => {
      try {
        const response = await fetch("https://api.example.com/faqs");
        const data = await response.json();
        dispatch({ type: "FETCH_FAQS_SUCCESS", payload: data }); // Populate the state with the fetched FAQs
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
  };
  
  export const updateFAQ = (id, updatedFAQ) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`https://api.example.com/faqs/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFAQ),
        });
        const data = await response.json();
        dispatch({ type: "UPDATE_FAQ", payload: data }); // Update the FAQ in the state
      } catch (error) {
        console.error("Error updating FAQ:", error);
      }
    };
  };
  
  export const deleteFAQ = (id) => {
    return async (dispatch) => {
      try {
        await fetch(`https://api.example.com/faqs/${id}`, {
          method: "DELETE",
        });
        dispatch({ type: "DELETE_FAQ", payload: id }); // Remove the FAQ from the state
      } catch (error) {
        console.error("Error deleting FAQ:", error);
      }
    };
  };
  