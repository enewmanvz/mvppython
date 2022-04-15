import '../App.css';
import axios from "axios";
import Header from './header';
import Footer from './footer';
import {useState, useEffect} from 'react';
import {Card, Button, Spinner, Form, Col, Row} from 'react-bootstrap';


function UpdateFood({passFoodID}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [foodItem, setFoodItem] = useState([]);
  const [validated, setValidated] = useState(false);

    console.log(passFoodID);

  const save = () => {
    fetch('http://localhost:5000/update_food', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   name: formData, // Use your own property name / key
      // }),
    })
      .then((res) => res.json())
      .then((result) => setFoodItem(result))
      .catch((err) => console.log('error'))
  }

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // const componentDidMount = () => {
  //   axios({
  //           method: 'POST',
  //           url: 'http://localhost:5000/update_food',
  //           data: {
  //               food_name: food_name,
  //               quantity: quantity
  //           }
  //       })
  //       .then(res => setFoodItem({ recipes: res.data }));
  // }

  // const getFood = async() => {
  //     const response = await axios.get(`http://localhost:5000/food_details/${passFoodID.food_id}`);
  //     setFoodItem(response.data);
  // };
  //
  // useEffect(() => {
  //     getFood();
  //   }, []);

  // useEffect( () => {
  //     async function fetchFoodItem() {
  //         let result = await fetch(`http://localhost:5000/food_details/${foodID}`);
  //         result = await result.json();
  //         setFoodItem(result);
  //     }},[])

  // const fetchFoodItem = async() => {
  //     try {
  //       const data = await axios.get(`http://localhost:5000/food_details/${passFoodID()}`)
  //       const response = await data.json();
  //       return setFoodItem(response);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     setIsLoaded(true);
  //   }
  //
  //
  // useEffect(() => {
  //     const getFoodItem = async () => {
  //         const oneFood = await fetchFoodItem();
  //         if(oneFood){
  //             setFoodItem(oneFood)
  //         }
  //     }
  //     getFoodItem();
  // }, []);

  if (error) {
      setIsLoaded(true);
      setError(error);
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
          <Header/>
          <main>
              <Card style={{width: '18rem', margin: '0 auto'}}>
                  <Card.Img variant="top" src={foodItem.image === null || foodItem.image === 'null' ? 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' : foodItem.image} />
                  <Card.Body>
                      <Card.Title>{foodItem.food_name}</Card.Title>
                      <Card.Text>Category: {foodItem.meal_category}</Card.Text>
                      <Card.Text>{foodItem.quantity} Remaining</Card.Text>
                      <a href='http://localhost:5000/update_food'><Button variant="warning">Edit</Button></a>
                  </Card.Body>
              </Card>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Row className="mb-3">
                 <Form.Group as={Col} md="4" controlId="validationCustom01">
                   <Form.Label>Food name</Form.Label>
                   <Form.Control
                     required
                     type="text"
                     placeholder="Name of Food Item"
                     defaultValue={foodItem.food_name}
                   />
                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                 </Form.Group>
                 <Form.Group as={Col} md="4" controlId="validationCustom02">
                   <Form.Label>Quantity</Form.Label>
                   <Form.Control
                     required
                     type="number"
                     placeholder="1"
                     defaultValue={foodItem.quantity}
                   />
                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                 </Form.Group>
                 {/*<Form.Group as={Col} md="4" controlId="validationCustomUsername">*/}
                 {/*  <Form.Label>Username</Form.Label>*/}
                 {/*  <InputGroup hasValidation>*/}
                 {/*    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>*/}
                 {/*    <Form.Control*/}
                 {/*      type="text"*/}
                 {/*      placeholder="Username"*/}
                 {/*      aria-describedby="inputGroupPrepend"*/}
                 {/*      required*/}
                 {/*    />*/}
                 {/*    <Form.Control.Feedback type="invalid">*/}
                 {/*      Please choose a username.*/}
                 {/*    </Form.Control.Feedback>*/}
                 {/*  </InputGroup>*/}
                 {/*</Form.Group>*/}
               </Row>
               {/*<Row className="mb-3">*/}
               {/*  <Form.Group as={Col} md="6" controlId="validationCustom03">*/}
               {/*    <Form.Label>City</Form.Label>*/}
               {/*    <Form.Control type="text" placeholder="City" required />*/}
               {/*    <Form.Control.Feedback type="invalid">*/}
               {/*      Please provide a valid city.*/}
               {/*    </Form.Control.Feedback>*/}
               {/*  </Form.Group>*/}
               {/*  <Form.Group as={Col} md="3" controlId="validationCustom04">*/}
               {/*    <Form.Label>State</Form.Label>*/}
               {/*    <Form.Control type="text" placeholder="State" required />*/}
               {/*    <Form.Control.Feedback type="invalid">*/}
               {/*      Please provide a valid state.*/}
               {/*    </Form.Control.Feedback>*/}
               {/*  </Form.Group>*/}
               {/*  <Form.Group as={Col} md="3" controlId="formFile" className="mb-3">*/}
               {/*    <Form.Label>Default file input example</Form.Label>*/}
               {/*    <Form.Control type="file" />*/}
               {/*  </Form.Group>*/}
               {/*</Row>*/}
               <Form.Group className="mb-3">
                 <Form.Check
                   required
                   label="Agree to terms and conditions"
                   feedback="You must agree before submitting."
                   feedbackType="invalid"
                 />
               </Form.Group>
               <Button type="submit">Submit form</Button>
             </Form>
          </main>
          <Footer/>
      </>
  )}
}

export default UpdateFood;


//function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 2000));
// }
//
// function LoadingButton() {
//   const [isLoading, setLoading] = useState(false);
//
//   useEffect(() => {
//     if (isLoading) {
//       simulateNetworkRequest().then(() => {
//         setLoading(false);
//       });
//     }
//   }, [isLoading]);
//
//   const handleClick = () => setLoading(true);
//
//   return (
//     <Button
//       variant="primary"
//       disabled={isLoading}
//       onClick={!isLoading ? handleClick : null}
//     >
//       {isLoading ? 'Loading…' : 'Click to load'}
//     </Button>
//   );
// }
//
// render(<LoadingButton />);

//function FormExample() {
//   const [validated, setValidated] = useState(false);
//
//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }
//
//     setValidated(true);
//   };
//
//   return (
//     <Form noValidate validated={validated} onSubmit={handleSubmit}>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="4" controlId="validationCustom01">
//           <Form.Label>First name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="First name"
//             defaultValue="Mark"
//           />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustom02">
//           <Form.Label>Last name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Last name"
//             defaultValue="Otto"
//           />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//           <Form.Label>Username</Form.Label>
//           <InputGroup hasValidation>
//             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//             <Form.Control
//               type="text"
//               placeholder="Username"
//               aria-describedby="inputGroupPrepend"
//               required
//             />
//             <Form.Control.Feedback type="invalid">
//               Please choose a username.
//             </Form.Control.Feedback>
//           </InputGroup>
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} md="6" controlId="validationCustom03">
//           <Form.Label>City</Form.Label>
//           <Form.Control type="text" placeholder="City" required />
//           <Form.Control.Feedback type="invalid">
//             Please provide a valid city.
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="3" controlId="validationCustom04">
//           <Form.Label>State</Form.Label>
//           <Form.Control type="text" placeholder="State" required />
//           <Form.Control.Feedback type="invalid">
//             Please provide a valid state.
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group as={Col} md="3" controlId="validationCustom05">
//           <Form.Label>Zip</Form.Label>
//           <Form.Control type="text" placeholder="Zip" required />
//           <Form.Control.Feedback type="invalid">
//             Please provide a valid zip.
//           </Form.Control.Feedback>
//         </Form.Group>
//       </Row>
//       <Form.Group className="mb-3">
//         <Form.Check
//           required
//           label="Agree to terms and conditions"
//           feedback="You must agree before submitting."
//           feedbackType="invalid"
//         />
//       </Form.Group>
//       <Button type="submit">Submit form</Button>
//     </Form>
//   );
// }
//
// render(<FormExample />);