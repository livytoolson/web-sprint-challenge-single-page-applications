import React, { useState, useEffect } from 'react';
import PizzaForm from './PizzaForm';
import schema from './formSchema';
import axios from 'axios';
import * as yup from 'yup';
import { Route, Link } from 'react-router-dom';

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
const initialFormErrors = {
  name: '',
  speacialInstructions: '',
  pizzaSize: '',
  cheese: false,
  pepperoni: false,
  ham: false,
  sausage: false,
}
const initialCustomer = []
const initialDisabled = true

const App = () => {
  // SET SLICES OF STATE
  const [order, setOrder] = useState(initialCustomer)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // // HELPER FUNCTIONS
  const postNewOrder = newOrder => {
    axios
      .post('https://reqres.in/api/users', newOrder)
      .then((res) => {
        setOrder([...order, res.data]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // // EVENT HANDLERS
  // const inputChange = (name, value) => {
  //   // console.log(name, value)
  //   yup
  //     .reach(schema, name)
  //     .validate(value)
  //     .then(() => {
  //       setFormErrors({
  //         ...formErrors,
  //         [name]: "",
  //       });
  //     })
  //     .catch((err) => {
  //       setFormErrors({
  //         ...formErrors,
  //         [name]: err.errors[0],
  //       });
  //     });
  
  //   setFormValues({
  //     ...formValues,
  //     [name]: value 
  //   });
  // }

   const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      speacialInstructions: formValues.speacialInstructions.trim(),
      pizzaSize: formValues.pizzaSize,
      cheese: formValues.cheese,
      pepperoni: formValues.pepperoni,
      ham: formValues.ham,
      sausage: formValues.sausage,
    }
  }

  // postNewOrder(newOrder);

  // SIDE EFFECTS
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
      
      <Link to="/pizzaform">
        <button>Pizza Order Form</button>
      </Link>

      <div>
        <Route path="/pizzaform" component={PizzaForm}
          values={formValues}
          errors={formErrors}
          disabled={disabled}
          submit={formSubmit}
        />
      </div>
    </div>
  );
};
export default App;
