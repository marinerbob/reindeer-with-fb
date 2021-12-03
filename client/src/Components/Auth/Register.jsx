import React, { useState } from 'react';

import { Modal, Button, Form, Nav } from 'react-bootstrap';

import AuthForm from './AuthForm';
import AuthModal from "./AuthModal";

const Register = () => {
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
            register
        </Nav.Link>

          <AuthModal title="Reindeer register" show={show} handleClose={handleClose}>
              <AuthForm closeCb={handleClose} />
          </AuthModal>
      </>
    );
  };

  export default Register;