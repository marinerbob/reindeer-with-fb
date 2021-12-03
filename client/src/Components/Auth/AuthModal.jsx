import React, {useState} from 'react';

import { Modal, Nav } from 'react-bootstrap';

import './AuthModal.css';

const AuthModal = ({ title, children, show, handleClose }) => {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="modalBody">
          <div className="title">{title}</div>
          {children}
        </Modal.Body>
      </Modal>
  );
};

export default AuthModal;