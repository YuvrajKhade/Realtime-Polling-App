import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <BSNavbar className="navbar-custom w-100" variant="dark" expand="lg">
      <Container fluid>
        <BSNavbar.Brand>📊 PollRooms</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create Poll
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
