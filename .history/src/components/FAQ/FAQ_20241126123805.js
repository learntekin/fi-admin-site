// FAQ.js (Your component)
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFAQs } from '../actions/faqActions';  // Ensure correct path to your actions

const FAQ = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector((state) => state.faq);  // Use the correct state slice for faq

  useEffect(() => {
    dispatch(fetchFAQs());  // Dispatch the async action to fetch FAQs
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>FAQs</h1>
      <ul>
        {faqs.map((faq) => (
          <li key={faq.id}>{faq.question}</li>  // Render the FAQs
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
