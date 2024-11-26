import React from 'react';
import { Modal, Button } from 'antd';

const WIPPopup = ({ visible, onClose }) => {
  return (
    <Modal
      title="Work in Progress"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p style={{color:"red", fontWeight:"bolder"}}>This website is a work in progress. Stay tuned for updates!, Sorry for the inconvinence</p>
    </Modal>
  );
};

export default WIPPopup;
