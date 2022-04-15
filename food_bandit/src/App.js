import './App.css';
import {useState, useEffect} from 'react';
import {Button, Card, CardGroup, Col, Row, Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UpdateFood from "./components/editFood";


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [food, setFood] = useState([]);
  const [counter, setCounter] = useState(0);

  // const addFood = (newFood) => {
  //   setFood([...food, newFood]);
  // };

  const passFoodID = (oneFoodItem) => {
      setFood(oneFoodItem)
  }

  useEffect(() => {
    fetch('http://localhost:5000/foodies')
    .then(response => response.json())
    .then(data => {setIsLoaded(true); setFood(data);},
       error => {
      setIsLoaded(true);
      setError(error);
       })
  },[])

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
          <main className="App">
              {/*- Call the Child Component in the Parent Component */}
              <UpdateFood passFoodID={{food}}/>
            <CardGroup>
                <Row xs={1} md={2} className="g-4">
              {food.map(item => (
                  <Col>
                    <Card style={{ width: '18rem', margin: '0 auto' }} key={item.id}>
                      <Card.Img variant="top" src={item.image === null || item.image === 'null' ? 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' : item.image} />
                      <Card.Body>
                        <Card.Title>{item.food_name}</Card.Title>
                        <Card.Text>Category: {item.meal_category}</Card.Text>
                        <Card.Text>{item.quantity} Remaining</Card.Text>
                          {/*  <NavLink*/}
                        {/*        className="navbar-item"*/}
                        {/*        activeClassName="is-active"*/}
                        {/*        to={`http://localhost:5000/food_details/${item.food_id}`}*/}
                        {/*        exact*/}
                        {/*    >*/}
                        {/*  <a href="./components/editFood.jsx"><Button variant="warning">Edit</Button></a>*/}
                        {/*</NavLink>*/}
                        <Link to="/update_food"><Button onClick={() => passFoodID(item)} variant="warning">Edit</Button></Link>
                      </Card.Body>
                    </Card>
                  </Col>
              ))}
                </Row>
            </CardGroup>
          </main>
      </>
  )}
}

export default App;


//<Card.Img variant="top" src='https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />