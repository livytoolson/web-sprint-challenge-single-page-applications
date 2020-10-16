import React, { useState, useEffect } from 'react';
import PizzaForm from './PizzaForm';
import schema from './formSchema';
import axios from 'axios';
import * as yup from 'yup';

const App = () => {

  // INITIAL STATE OF THE FORM
  const initialFormValues = {
    // TEXT INPUT
    name: '',
    speacialInstructions: '',
    // DROPDOWN
    pizzaSize: '',
    // CHECKBOXES
    cheese: false,
    pepperoni: false,
    ham: false,
    sausage: false,
  }
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
    </>
  );
};
export default App;
