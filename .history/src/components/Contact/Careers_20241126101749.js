import React, { useEffect, useState } from "react";
import { db } from '../../firebase'; // Import the initialized Firestore instance

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCareer, setNewCareer] = useState({
    Fname: '',
    Lname: '',
    email: '',
    evening: '',
    options: '',
    phoneN: '',
    referN: '',
    roleN: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentCareer, setCurrentCareer] = useState(null);

  // Fetch careers from Firestore
  const fetchCareers = async () => {
    try {
      const snapshot = await db.collection('careers').get();
      const careerData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCareers(careerData);
    } catch (error) {
      console.error("Error fetching careers: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers(); // Fetch careers when component mounts
  }, []);

  // Create a new career
  const handleCreate = async () => {
    if (!newCareer.Fname || !newCareer.Lname || !newCareer.email || !newCareer.phoneN || !newCareer.roleN) {
      alert("All fields are required!");
      return;
    }

    try {
      await db.collection('careers').add(newCareer);
      setNewCareer({ Fname: '', Lname: '', email: '', evening: '', options: '', phoneN: '', referN: '', roleN: '' });
      fetchCareers(); // Refresh the career list
      alert("Career created successfully!");
    } catch (error) {
      console.error("Error adding career: ", error);
      alert("Error creating career.");
    }
  };

  // Update an existing career
  const handleUpdate = async () => {
    if (!newCareer.Fname || !newCareer.Lname || !newCareer.email || !newCareer.phoneN || !newCareer.roleN) {
      alert("All fields are required!");
      return;
    }

    try {
      await db.collection('careers').doc(currentCareer.id).update(newCareer);
      setEditing(false);
      setCurrentCareer(null);
      setNewCareer({ Fname: '', Lname: '', email: '', evening: '', options: '', phoneN: '', referN: '', roleN: '' });
      fetchCareers(); // Refresh the career list
      alert("Career updated successfully!");
    } catch (error) {
      console.error("Error updating career: ", error);
      alert("Error updating career.");
    }
  };

  // Delete a career
  const handleDelete = async (id) => {
    try {
      await db.collection('careers').doc(id).delete();
      fetchCareers(); // Refresh the career list
      alert("Career deleted successfully!");
    } catch (error) {
      console.error("Error deleting career: ", error);
      alert("Error deleting career.");
    }
  };

  // Set editing mode and prefill the form with selected career's data
  const handleEdit = (career) => {
    setEditing(true);
    setCurrentCareer(career);
    setNewCareer({ 
      Fname: career.Fname, 
      Lname: career.Lname, 
      email: career.email, 
      evening: career.evening, 
      options: career.options, 
      phoneN: career.phoneN, 
      referN: career.referN, 
      roleN: career.roleN 
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Career List</h1>

      {/* Form for adding or updating careers */}
      <div className="mb-4">
        <h3>{editing ? "Edit Career" : "Add New Career"}</h3>
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={newCareer.Fname}
          onChange={(e) => setNewCareer({ ...newCareer, Fname: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={newCareer.Lname}
          onChange={(e) => setNewCareer({ ...newCareer, Lname: e.target.value })}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={newCareer.email}
          onChange={(e) => setNewCareer({ ...newCareer, email: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number"
          value={newCareer.phoneN}
          onChange={(e) => setNewCareer({ ...newCareer, phoneN: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Role"
          value={newCareer.roleN}
          onChange={(e) => setNewCareer({ ...newCareer, roleN: e.target.value })}
        />
        <button
          className="btn btn-primary"
          onClick={editing ? handleUpdate : handleCreate}
        >
          {editing ? "Update Career" : "Add Career"}
        </button>
      </div>

      {/* Careers Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((career) => (
            <tr key={career.id}>
              <td>{career.Fname}</td>
              <td>{career.Lname}</td>
              <td>{career.email}</td>
              <td>{career.phoneN}</td>
              <td>{career.roleN}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(career)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(career.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Careers;
