import React from 'react'
import Icon from '../Images/ReinDeer_logo.png'
import CartIcon from '../Images/shopping_cart_item.png'
import { useHistory } from 'react-router'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { People, BoxArrowRight } from 'react-bootstrap-icons';

import Register from './Auth/Register';
import Login from './Auth/Login';

import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const LoggedBlock = ({ email }) => {
  return (
      <>
        <Nav.Link title={email}>
          <People size={30} />
        </Nav.Link>
        <Nav.Link title="Logout" onClick={async () => await logout()}>
          <BoxArrowRight size={30} />
        </Nav.Link>
      </>
  );
};

const Header = () => {
  const history = useHistory();
  const [user] = useAuthState(auth);

  return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid className="NavItems">
            <Navbar.Brand
                onClick={() => history.push('/')}
                style={{ cursor: 'pointer', marginLeft: '6rem' }}
            >
              <img
                  alt="icon"
                  src={Icon}
                  width="100"
                  height="30"
                  className="d-inline-block align-top m-2 pr-2"
              />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav
                  className="ml-auto paddingLeft5"
                  style={{ marginRight: '7rem' }}
              >
                {user ? (
                    <LoggedBlock email={user.email} />
                ) : (<>
                      <Login />
                      <Register />
                    </>
                ) }

                <NavDropdown
                    title="en"
                    id="basic-nav"
                    style={{ width: '60px', marginLeft: '20px' }}
                ></NavDropdown>

                <Nav.Link
                    className="float-end"
                    style={{ width: '50px', backgroundColor: 'dark' }}
                    eventKey={2}
                    onClick={() => history.push('/Cart')}
                >
                  <img
                      alt="icon"
                      src={CartIcon}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                  />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
  )
}

export default Header
