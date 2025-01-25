// firebaseCRUD.js
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Create FAQ
export const createFAQ = async (newFAQ) => {
  try {
    const docRef = await addDoc(collection(db, "faqs"), {
      question: newFAQ.question,
      answer: newFAQ.answer,
      status: newFAQ.status,
    });
    return docRef.id;
  } catch (e) {
    throw new Error("Error adding document: " + e);
  }
};

// Fetch FAQs
export const fetchFAQs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "faqs"));
    const faqs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return faqs;
  } catch (e) {
    throw new Error("Error getting documents: " + e);
  }
};

// Update FAQ
export const updateFAQ = async (id, updatedFAQ) => {
  try {
    const faqRef = doc(db, "faqs", id);
    await updateDoc(faqRef, updatedFAQ);
  } catch (e) {
    throw new Error("Error updating document: " + e);
  }
};

// Delete FAQ
export const deleteFAQ = async (id) => {
  try {
    await deleteDoc(doc(db, "faqs", id));
  } catch (e) {
    throw new Error("Error deleting document: " + e);
  }
};
