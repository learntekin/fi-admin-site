import React, { useEffect, useState } from "react";
import { db } from '../../firebase'; // Import Firestore instance

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
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

  // Create Contact
  const handleCreate = async () => {
    if (!newContact.name || !newContact.email || !newContact.subject || !newContact.message) {
      alert("All fields are required!");
      return;
    }

    try {
      await db.collection('contacts').add(newContact);
      setNewContact({ name: '', email: '', subject: '', message: '' }); // Reset form
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact: ", error);
    }
  };

  // Update Contact
  const handleUpdate = async () => {
    if (!newContact.name || !newContact.email || !newContact.subject || !newContact.message) {
      alert("All fields are required!");
      return;
    }

    try {
      await db.collection('contacts').doc(currentContact.id).update(newContact);
      setEditing(false); // Reset editing state
      setCurrentContact(null);
      setNewContact({ name: '', email: '', subject: '', message: '' });
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact: ", error);
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    try {
      await db.collection('contacts').doc(id).delete();
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };

  // Start Editing Contact
  const handleEdit = (contact) => {
    setEditing(true);
    setCurrentContact(contact);
    setNewContact({ name: contact.name, email: contact.email, subject: contact.subject, message: contact.message });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Contact List</h1>

      {/* Contact Form (Create or Update) */}
      <div className="mb-4">
        <h3>{editing ? "Edit Contact" : "Add New Contact"}</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Subject"
          value={newContact.subject}
          onChange={(e) => setNewContact({ ...newContact, subject: e.target.value })}
        />
        <textarea
          className="form-control"
          placeholder="Message"
          value={newContact.message}
          onChange={(e) => setNewContact({ ...newContact, message: e.target.value })}
        ></textarea>
        <button
          className="btn btn-primary"
          onClick={editing ? handleUpdate : handleCreate}
        >
          {editing ? "Update Contact" : "Add Contact"}
        </button>
      </div>

      {/* Contacts Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Subject</th>
            <th scope="col">Message</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(contact)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
