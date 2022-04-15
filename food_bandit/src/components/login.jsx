import '../App.css';
import {useState, useEffect} from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';


function Login() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);

  const logIn = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user,
      }),
    })
      .then((res) => res.json())
      .then((result) => setUser(result.rows))
      .catch((err) => console.log('error'))
  }

  const handleSubmit = event => {
    event.preventDefault();
    logIn();
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
  } else {
  return (
      <>
          <main>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name={"email"} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name={"password"} />
              </Form.Group>
              {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
              {/*  <Form.Check type="checkbox" label="Check me out" />*/}
              {/*</Form.Group>*/}
              <Button variant="success" type="submit">Log In</Button>
            </Form>
          </main>
      </>
  )}
}

export default Login;