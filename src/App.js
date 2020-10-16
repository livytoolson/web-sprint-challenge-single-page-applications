import React, { useState } from 'react';
import PizzaForm from './PizzaForm';
import Home from './Home'
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import schema from './formSchema';
import * as yup from 'yup';

// INITIAL STATE OF THE FORM
const initialFormValues = {
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
// const initialDisabled = true

export default function App () {
  // SET SLICES OF STATE
  const [order, setOrder] = useState(initialOrder)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  // const [disabled, setDisabled] = useState(initialDisabled)

  // // HELPER FUNCTIONS
  const postNewOrder = newOrder => {
    axios
      .post('https://reqres.in/api/users', newOrder)
      .then((res) => {
        console.log(res.data)
        setOrder([...order, res.data]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // EVENT HANDLERS
  const inputChange = (name, value) => {
    // console.log(name, value)
    yup
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
  
    setFormValues({
      ...formValues,
      [name]: value 
    });
  }

   const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      speacialInstructions: formValues.specialInstructions.trim(),
      pizzaSize: formValues.pizzaSize,
      cheese: formValues.cheese,
      pepperoni: formValues.pepperoni,
      ham: formValues.ham,
      sausage: formValues.sausage,
    }

    // post newOrder using postNewOrder helper function
    postNewOrder(newOrder);
  }

  // SIDE EFFECTS
  // adjust the status of disabled everytime the formValues changes
  // useEffect(() => {
  //   schema.isValid(formValues).then(valid => {
  //     setDisabled(!valid);
  //   })
  // }, [formValues])

  return (
    <div>
      <header>
        <h1>Lambda Eats</h1>
      </header>

      <Route exact path='/'>
          <Home />
        </Route>
      
      <Link to="/pizzaform">
        <button>Pizza Order Form</button>
      </Link>

      <Route path="/pizzaform">
        <PizzaForm 
        values={formValues}
        errors={formErrors}
        // disabled={disabled}
        submit={formSubmit}
        change={inputChange}
        />
      </Route>
    </div>
  )
}