import React, { useEffect, useState } from "react";
import { db } from './firebase'; // Import the initialized Firestore instance

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contacts from Firestore
    const fetchContacts = async () => {
      try {
        const snapshot = await db.collection('contacts').get();
        const contactData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setContacts(contactData);
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>Name:</strong> {contact.name}<br />
            <strong>Email:</strong> {contact.email}<br />
            <strong>Subject:</strong> {contact.subject}<br />
            <strong>Message:</strong> {contact.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
