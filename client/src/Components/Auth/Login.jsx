import React, { useState } from 'react';

import { Modal, Button, Form, Nav } from 'react-bootstrap';

import AuthForm from './AuthForm';

const Login = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Nav.Link
            style={{ width: '60px', backgroundColor: 'dark' }}
            eventKey={2}
            onClick={handleShow}
            className="float-right"
        >
            login
        </Nav.Link>
  
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header>
            <Modal.Title>Reindeer login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AuthForm isLogin closeCb={handleClose} />
          </Modal.Body>
        </Modal>
      </>
    );
  };

  export default Login;