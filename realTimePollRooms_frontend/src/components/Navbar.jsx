import Navbar  from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom";
import assest from "../assests/assest";

function AppNavbar() {
  return (
    <Navbar className="navbar-custom w-100" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand> <img src={assest.poll} alt="poll" height={40} width={40}/> PollRooms</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create Poll
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
