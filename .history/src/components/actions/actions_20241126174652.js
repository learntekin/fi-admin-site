import { db } from '../../firebase'; // Import your Firestore instance

// Action Types
export const FETCH_COUNTS = 'FETCH_COUNTS';
export const FETCH_COUNTS_ERROR = 'FETCH_COUNTS_ERROR';

// Action to fetch counts
export const fetchCounts = () => async (dispatch) => {
  try {
    // Fetch document counts from Firestore
    const faqSnapshot = await db.collection('FAQ').get();
    const careersSnapshot = await db.collection('careers').get();
    const contactsSnapshot = await db.collection('contacts').get();

    // Dispatch the counts to the Redux store
    dispatch({
      type: FETCH_COUNTS,
      payload: {
        faqCount: faqSnapshot.size,
        careersCount: careersSnapshot.size,
        contactCount: contactsSnapshot.size,
      },
    });
  } catch (error) {
    console.error("Error fetching counts: ", error);
    dispatch({
      type: FETCH_COUNTS_ERROR,
      payload: error.message,
    });
  }
};
