import { useState } from "react"

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (e) => setValues({
    ...values,
    [e.target.name]: e.target.value
  });

  const clear = () => setValues(initialValues);

  return {
    values,
    setValues,
    handleChange,
    clear
  }
}