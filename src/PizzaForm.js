import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

// COMPONENT STYLING 
const StyledTitle = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const HomeButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
`

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
            <StyledTitle>Pizza Order Form</StyledTitle>
            {/* RENDER VALIDATION ERRORS */}
            <div>
                <div className="errors">{errors.name}</div>
            </div>

            <StyledDiv>
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
            </StyledDiv>

            <div>
                <Link to="/">
                    <HomeButton>Home</HomeButton>
                </Link>
            </div>
        </form>
    )
}