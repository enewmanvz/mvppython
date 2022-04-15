import {useState} from "react";
import "../App.css";
import {Button, Col, Form, Row} from "react-bootstrap";


function Register(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the first name state change
  const handleFirstName = e => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };

  // Handling the last name state change
  const handleLastName = e => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email state change
  const handleEmail = e => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password state change
  const handlePassword = e => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      sendToDatabase();
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>{firstName} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error state is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>All fields are required</h1>
      </div>
    );
  };

  const sendToDatabase = () => {

  }

  return(
      <Form>
        {successMessage()}
        {errorMessage()}
        <Row>
          <Col>
            <Form.Control onChange={handleFirstName} value={firstName} placeholder="First name" type={"text"} required />
          </Col>
          <Col>
            <Form.Control onChange={handleLastName} value={lastName} placeholder="Last name" type={"text"} required />
          </Col>
        </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={handleEmail} value={email} type="email" placeholder="youremail@example.com" required />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handlePassword} value={password} type="password" placeholder="Password" required />
          </Form.Group>
        </Row>

          <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={handleSubmit} type="submit">Sign up</Button>
          </Col>
        </Form.Group>
      </Form>
  )
}

export default Register;