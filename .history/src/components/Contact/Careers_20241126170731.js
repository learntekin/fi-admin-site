import React, { useEffect, useState } from "react";
import { db } from '../../firebase'; // Import the initialized Firestore instance
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS
import { Modal, Button } from 'antd';
import 'antd/dist/reset.css';

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
  const [viewModal, setViewModal] = useState({ visible: false, career: null });

  // Initialize Toastify
  useEffect(() => {
    toast.configure(); // Configure Toastify once when component mounts
  }, []);

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
      toast.error("Error fetching careers!"); // Error toast on fetching careers
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
      toast.warn("All fields are required!"); // Warning toast if fields are missing
      return;
    }

    try {
      await db.collection('careers').add(newCareer);
      setNewCareer({ Fname: '', Lname: '', email: '', evening: '', options: '', phoneN: '', referN: '', roleN: '' });
      fetchCareers(); // Refresh the career list
      toast.success("Career created successfully!"); // Success toast on career creation
    } catch (error) {
      console.error("Error adding career: ", error);
      toast.error("Error creating career."); // Error toast on creating career
    }
  };

  // Update an existing career
  const handleUpdate = async () => {
    if (!newCareer.Fname || !newCareer.Lname || !newCareer.email || !newCareer.phoneN || !newCareer.roleN) {
      toast.warn("All fields are required!"); // Warning toast if fields are missing
      return;
    }

    if (!currentCareer) {
      toast.warn("No career selected for editing."); // Warning toast if no career is selected for edit
      return;
    }

    try {
      // Ensure that the career ID is being passed to Firestore
      await db.collection('careers').doc(currentCareer.id).update({
        Fname: newCareer.Fname,
        Lname: newCareer.Lname,
        email: newCareer.email,
        evening: newCareer.evening,
        options: newCareer.options,
        phoneN: newCareer.phoneN,
        referN: newCareer.referN,
        roleN: newCareer.roleN
      });

      setEditing(false);
      setCurrentCareer(null);
      setNewCareer({ Fname: '', Lname: '', email: '', evening: '', options: '', phoneN: '', referN: '', roleN: '' });
      fetchCareers(); // Refresh the career list
      toast.success("Career updated successfully!"); // Success toast on career update
    } catch (error) {
      console.error("Error updating career: ", error);
      toast.error("Error updating career."); // Error toast on updating career
    }
  };

  // Delete a career
  const handleDelete = async (id) => {
    try {
      await db.collection('careers').doc(id).delete();
      fetchCareers(); // Refresh the career list
      toast.success("Career deleted successfully!"); // Success toast on career delete
    } catch (error) {
      console.error("Error deleting career: ", error);
      toast.error("Error deleting career."); // Error toast on deleting career
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

  const handleView = (career) => {
    setViewModal({ visible: true, career });
  };

  const closeModal = () => {
    setViewModal({ visible: false, career: null });
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
                <button className="btn btn-info" onClick={() => handleView(career)}>View</button>
                <button className="btn btn-warning" onClick={() => handleEdit(career)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(career.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Career Modal */}
      <Modal
        title="Career Details"
        visible={viewModal.visible}
        onOk={closeModal}
        onCancel={closeModal}
        okText="Close"
        cancelButtonProps={{ style: { display: "none" } }}
        centered
      >
        <p><strong>First Name:</strong> {viewModal.career?.Fname}</p>
        <p><strong>Last Name:</strong> {viewModal.career?.Lname}</p>
        <p><strong>Email:</strong> {viewModal.career?.email}</p>
        <p><strong>Phone:</strong> {viewModal.career?.phoneN}</p>
        <p><strong>Role:</strong> {viewModal.career?.roleN}</p>
        <p><strong>Options:</strong> {viewModal.career?.options}</p>
      </Modal>
    </div>
  );
};

export default Careers;
