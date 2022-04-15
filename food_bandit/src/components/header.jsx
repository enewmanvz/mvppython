import logo from '../logo.svg';
import '../App.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";


function Header() {
  return (
      <Navbar id="Navbar" className={"bg-dark"}>
          <Container fluid>
              <Nav.Item className="App-header justify-content-start">
                  <Navbar.Brand href="https://reactjs.org" target="_blank" className="App-link" rel="noopener noreferrer"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
              </Nav.Item>
              <Nav>
                  <Nav.Item>
                      <Nav.Link href="/login"><Button variant={"outline-warning"}>Login</Button></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="/registration"><Button variant={"outline-warning"}>Sign Up</Button></Nav.Link>
                  </Nav.Item>
              </Nav>
          </Container>
      </Navbar>
  )
}

export default Header;