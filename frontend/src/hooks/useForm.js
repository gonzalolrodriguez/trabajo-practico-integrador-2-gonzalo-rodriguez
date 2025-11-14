import { useState } from "react";

const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setValues((prevValues) => ({ ...prevValues, [name]: newValue })); // Mejorado para evitar "race conditions"
        /*
        Una race condition ocurre cuando dos o mas procesos acceden o modifican el mismo recurso
        compartido al mismo tiempo y el resultado final depende del orden en que se ejecuten osea se apuesta a cual se modifica primero
        */
        setValues({ ...values, [name]: newValue });
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return { values, setValues, handleChange, handleReset };
};

export default useForm;
