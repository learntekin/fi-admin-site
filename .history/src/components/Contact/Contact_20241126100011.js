import React, { useEffect, useState } from "react";
import { db } from '../../firebase'; // Import the initialized Firestore instance

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
    <div className="container">
      <h1>Contact List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Subject</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
