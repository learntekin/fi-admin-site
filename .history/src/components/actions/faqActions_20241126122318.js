import { db } from "../../firebase"; // Firebase instance
import { toast } from "react-toastify";

export const fetchFAQs = () => async (dispatch) => {
  try {
    const snapshot = await db.collection("faq").get();
    const faqData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({ type: "FETCH_FAQS_SUCCESS", payload: faqData });
  } catch (error) {
    dispatch({ type: "FETCH_FAQS_ERROR", payload: error.message });
    toast.error("Error fetching FAQs!");
  }
};

export const createFAQ = (newFAQ) => async (dispatch) => {
  if (!newFAQ.question || !newFAQ.answer) {
    toast.warn("Both question and answer are required!");
    return;
  }

  try {
    await db.collection("faq").add(newFAQ);
    dispatch({ type: "CREATE_FAQ_SUCCESS", payload: newFAQ });
    toast.success("FAQ added successfully!");
  } catch (error) {
    dispatch({ type: "CREATE_FAQ_ERROR", payload: error.message });
    toast.error("Error adding FAQ!");
  }
};

export const updateFAQ = (updatedFAQ) => async (dispatch) => {
  if (!updatedFAQ.question || !updatedFAQ.answer) {
    toast.warn("Both question and answer are required!");
    return;
  }

  try {
    await db.collection("faq").doc(updatedFAQ.id).update(updatedFAQ);
    dispatch({ type: "UPDATE_FAQ_SUCCESS", payload: updatedFAQ });
    toast.success("FAQ updated successfully!");
  } catch (error) {
    dispatch({ type: "UPDATE_FAQ_ERROR", payload: error.message });
    toast.error("Error updating FAQ!");
  }
};

export const deleteFAQ = (id) => async (dispatch) => {
  try {
    await db.collection("faq").doc(id).delete();
    dispatch({ type: "DELETE_FAQ_SUCCESS", payload: id });
    toast.success("FAQ deleted successfully!");
  } catch (error) {
    dispatch({ type: "DELETE_FAQ_ERROR", payload: error.message });
    toast.error("Error deleting FAQ!");
  }
};
