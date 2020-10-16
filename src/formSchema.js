import * as yup from "yup";

export default yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    pizzaSize: yup
        .string()
        .oneOf(['Small', 'Medium', 'Large', 'Extra Large']),
    cheese: yup
        .boolean(),
    pepperoni: yup
        .boolean(),
    ham: yup
        .boolean(),
    sausage: yup
        .boolean(),
    specialInstructions: yup
        .string(),
});