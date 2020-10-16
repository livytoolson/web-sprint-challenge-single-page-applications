import React, { useState, useEffect } from 'react';
import PizzaForm from './PizzaForm';
import Home from './Home';
import axios from 'axios';
import { Route } from 'react-router-dom';
import schema from './formSchema';
import * as yup from 'yup';

// INITIAL STATE OF THE FORM
const initialFormValues = {  // STEP 1
  // TEXT INPUT
  name: '',
  specialInstructions: '',
  // DROPDOWN
  pizzaSize: '',
  // CHECKBOXES
  cheese: false,
  pepperoni: false,
  ham: false,
  sausage: false,
}
const initialFormErrors = {
  name: '',
  cheese: false,
  pepperoni: false,
  ham: false,
  sausage: false,
  specialInstructions: '',
}
const initialOrder = []
const initialDisabled = true

export default function App () {
  // SET SLICES OF STATE
  const [order, setOrder] = useState(initialOrder)
  const [formValues, setFormValues] = useState(initialFormValues)  // STEP 2
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // // HELPER FUNCTIONS
  const postNewOrder = newOrder => { // STEP 16
    axios
      .post('https://reqres.in/api/users', newOrder)
      .then((res) => {
        console.log(res.data) // STEP 17
        setOrder([...order, res.data]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // EVENT HANDLERS
  const inputChange = (name, value) => { // STEP 7
    // console.log(name, value)
    yup // STEP 8
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  
    setFormValues({ // STEP 9
      ...formValues,
      [name]: value 
    });
  }

   const formSubmit = () => { // STEP 14
    const newOrder = { // STEP 14.5
      name: formValues.name.trim(),
      speacialInstructions: formValues.specialInstructions.trim(),
      pizzaSize: formValues.pizzaSize,
      cheese: formValues.cheese,
      pepperoni: formValues.pepperoni,
      ham: formValues.ham,
      sausage: formValues.sausage,
    }

    // post newOrder using postNewOrder helper function
    postNewOrder(newOrder); // STEP 15
  }

  // SIDE EFFECTS
  // adjust the status of disabled everytime the formValues changes
  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    })
  }, [formValues])

  return (
    <div>
      <Route exact path='/'>
          <Home />
      </Route>

      <Route path="/pizzaform">
        <PizzaForm 
        values={formValues} // STEP 3 // STEP 10
        errors={formErrors}
        disabled={disabled}
        submit={formSubmit}
        change={inputChange}
        />
      </Route>
    </div>
  )
}