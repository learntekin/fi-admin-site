import { db } from "../../"; // Firestore instance

// Action Types
export const FETCH_FAQS = "FETCH_FAQS";
export const ADD_FAQ = "ADD_FAQ";
export const UPDATE_FAQ = "UPDATE_FAQ";
export const DELETE_FAQ = "DELETE_FAQ";

// Action Creators
export const fetchFaqs = () => async (dispatch) => {
  try {
    const snapshot = await db.collection("faq").get();
    const faqData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({ type: FETCH_FAQS, payload: faqData });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
  }
};

export const addFaq = (faq) => async (dispatch) => {
  try {
    const docRef = await db.collection("faq").add(faq);
    dispatch({ type: ADD_FAQ, payload: { id: docRef.id, ...faq } });
  } catch (error) {
    console.error("Error adding FAQ:", error);
  }
};

export const updateFaq = (id, faq) => async (dispatch) => {
  try {
    await db.collection("faq").doc(id).update(faq);
    dispatch({ type: UPDATE_FAQ, payload: { id, ...faq } });
  } catch (error) {
    console.error("Error updating FAQ:", error);
  }
};

export const deleteFaq = (id) => async (dispatch) => {
  try {
    await db.collection("faq").doc(id).delete();
    dispatch({ type: DELETE_FAQ, payload: id });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
  }
};
