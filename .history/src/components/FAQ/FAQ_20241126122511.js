import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFAQs, createFAQ, updateFAQ, deleteFAQ } from "../actions/faqActions";
import 'react-toastify/dist/ReactToastify.css';

const FAQ = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector((state) => state.faq);

  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);

  // Fetch FAQs when the component mounts
  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  // Handle create FAQ
  const handleCreate = () => {
    dispatch(createFAQ(newFAQ));
    setNewFAQ({ question: '', answer: '' });
  };

  // Handle update FAQ
  const handleUpdate = () => {
    dispatch(updateFAQ({ ...newFAQ, id: currentFAQ.id }));
    setEditing(false);
    setCurrentFAQ(null);
    setNewFAQ({ question: '', answer: '' });
  };

  // Handle delete FAQ
  const handleDelete = (id) => {
    dispatch(deleteFAQ(id));
  };

  // Handle editing FAQ
  const handleEdit = (faq) => {
    setEditing(true);
    setCurrentFAQ(faq);
    setNewFAQ({ question: faq.question, answer: faq.answer });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
      <h1>FAQ List</h1>

      {/* Form for adding or updating FAQs */}
      <div className="mb-4">
        <h3>{editing ? "Edit FAQ" : "Add New FAQ"}</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Question"
          value={newFAQ.question}
          onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
        />
        <textarea
          className="form-control"
          placeholder="Answer"
          value={newFAQ.answer}
          onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
        ></textarea>
        <button
          className="btn btn-primary"
          onClick={editing ? handleUpdate : handleCreate}
        >
          {editing ? "Update FAQ" : "Add FAQ"}
        </button>
      </div>

      {/* FAQs Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Answer</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(faq)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(faq.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FAQ;
