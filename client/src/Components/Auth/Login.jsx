import React, { useState } from 'react';

import { Nav } from 'react-bootstrap';

import AuthForm from './AuthForm';
import AuthModal from "./AuthModal";

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
  
        <AuthModal title="Reindeer login" show={show} handleClose={handleClose}>
            <AuthForm isLogin closeCb={handleClose} />
        </AuthModal>
      </>
    );
  };

  export default Login;