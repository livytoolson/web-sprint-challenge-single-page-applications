import React from 'react';
import { Link } from 'react-router-dom';

export default function PizzaForm(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Pizza Order Form</h1>
            {/* RENDER VALIDATION ERRORS */}
            <div>
                <div className="errors">{errors.name}</div>
            </div>

            <div>
                {/* NAME TEXT INPUT */}
                <label>Name
                    <input 
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    type="text"
                    />
                </label>

                {/* PIZZA SIZE DROPDOWN */}
                <label>Pizza Size
                    <select name= "pizzaSize" value={values.pizzaSize} onChange={onChange}>
                        <option value="">---Select Pizza Size---</option>
                        <option value="s">Small</option>
                        <option value="m">Medium</option>
                        <option value="l">Large</option>
                        <option value="xl">Extra Large</option>
                    </select>
                </label>

                {/* TOPPINGS CHECKLIST */}
                <label>Cheese
                    <input 
                    type="checkbox"
                    name="cheese"
                    checked={values.cheese === true}
                    onChange={onChange}
                    />
                </label>
                <label>Pepperoni
                    <input 
                    type="checkbox"
                    name="pepperoni"
                    checked={values.pepperoni === true}
                    onChange={onChange}
                    />
                </label>
                <label>Ham
                    <input 
                    type="checkbox"
                    name="ham"
                    checked={values.ham === true}
                    onChange={onChange}
                    />
                </label>
                <label>Sausage
                    <input 
                    type="checkbox"
                    name="sausage"
                    checked={values.sausage === true}
                    onChange={onChange}
                    />
                </label>

                {/* SPECIAL ORDER INSTRUCTIONS */}
                <label>Special Order Instructions
                    <input 
                    value={values.specialInstructions}
                    onChange={onChange}
                    name="specialInstructions"
                    type="text"
                    />
                </label>

                {/* ORDER BUTTON */}
                <button id='submitBtn' disabled={disabled}>Submit Order</button>
            </div>

            <div>
                <Link to="/">
                    <button>Home</button>
                </Link>
            </div>
        </form>
    )
}