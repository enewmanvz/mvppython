import { useState } from 'react';

function NewFoodForm({ addFood }) {
  const [newFood, setNewFood] = useState('');

  const updateNewFood = (event) => {
    setNewFood(event.target.value);
  };

  const formSubmitted = (event) => {
    event.preventDefault();
    addFood({
      id: Date.now(), // need a unique value... usually provided from a server
      title: newFood
    });
    setNewFood('');
  };

  return (
    <form onSubmit={formSubmitted}>
      <label htmlFor="newFood">New</label>
      <input onChange={updateNewFood} id="newFood" value={newFood} />
      <button type="submit">Add</button>
    </form>
  );
}

export default NewFoodForm;