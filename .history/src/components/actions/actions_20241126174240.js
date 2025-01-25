import { FETCH_COUNTS } from './types';
import { db } from "../../firebase"; // Assuming you are using Firebase Firestore

export const fetchCounts = () => async (dispatch) => {
  try {
    const careersSnapshot = await db.collection('careers').get();
    const contactSnapshot = await db.collection('contact').get();
    const faqSnapshot = await db.collection('faq').get();

    const counts = {
      careersCount: careersSnapshot.size,
      contactCount: contactSnapshot.size,
      faqCount: faqSnapshot.size,
    };

    dispatch({
      type: FETCH_COUNTS,
      payload: counts,
    });
  } catch (error) {
    console.error("Error fetching counts: ", error);
  }
};

// src/components/actions/types.js

export const FETCH_COUNTS = 'FETCH_COUNTS';

