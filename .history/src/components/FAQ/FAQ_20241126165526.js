import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFaqs, addFaq, updateFaq, deleteFaq } from "../../components/actions/fetchFaqs";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

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
      toast.warn("Both question and answer are required.");
      return;
    }

    if (editing) {
      dispatch(updateFaq(currentFaqId, newFaq))
        .then(() => toast.success("FAQ updated successfully!"))
        .catch((err) => toast.error("Failed to update FAQ: " + err.message));
    } else {
      dispatch(addFaq(newFaq))
        .then(() => toast.success("FAQ added successfully!"))
        .catch((err) => toast.error("Failed to add FAQ: " + err.message));
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
    dispatch(deleteFaq(id))
      .then(() => toast.success("FAQ deleted successfully!"))
      .catch((err) => toast.error("Failed to delete FAQ: " + err.message));
  };

  const handleView = (faq) => {
    Swal.fire({
      title: faq.question,
      text: faq.answer,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="container">
      <h1>FAQ Management</h1>

      {/* Form Section */}
      <Form className="mb-4">
        <h3>{editing ? "Edit FAQ" : "Add New FAQ"}</h3>
        <Form.Group controlId="faqQuestion">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the question"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="faqAnswer">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter the answer"
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleFormSubmit}>
          {editing ? "Update FAQ" : "Add FAQ"}
        </Button>
      </Form>

      {/* FAQ Table */}
      <Table striped bordered hover>
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
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => handleView(faq)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(faq)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(faq.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ToastContainer />
    </div>
  );
};

export default FAQ;
