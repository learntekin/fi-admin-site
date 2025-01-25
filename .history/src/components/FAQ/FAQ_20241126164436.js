import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFaqs, addFaq, updateFaq, deleteFaq } from "../../components/actions/fetchFaqs";

const FAQ = () => {
  const dispatch = useDispatch();
  const { faqs } = useSelector((state) => state.faq);

  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [editing, setEditing] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState(null);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const handleFormSubmit = () => {
    if (!newFaq.question || !newFaq.answer) {
      alert("Both question and answer are required.");
      return;
    }

    if (editing) {
      dispatch(updateFaq(currentFaqId, newFaq));
    } else {
      dispatch(addFaq(newFaq));
    }

    setNewFaq({ question: "", answer: "" });
    setEditing(false);
    setCurrentFaqId(null);
  };

  const handleEdit = (faq) => {
    setEditing(true);
    setCurrentFaqId(faq.id);
    setNewFaq({ question: faq.question, answer: faq.answer });
  };

  const handleDelete = (id) => {
    dispatch(deleteFaq(id));
  };

  return (
    <div className="container">
      <h1>FAQ Management</h1>

      {/* Form Section */}
      <div className="form-section">
        <h3>{editing ? "Edit FAQ" : "Add New FAQ"}</h3>
        <input
          type="text"
          placeholder="Question"
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
        />
        <textarea
          placeholder="Answer"
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
        />
        <button onClick={handleFormSubmit}>
          {editing ? "Update FAQ" : "Add FAQ"}
        </button>
      </div>

      {/* FAQ Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <button onClick={() => handleEdit(faq)}>Edit</button>
                <button onClick={() => handleDelete(faq.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FAQ;
