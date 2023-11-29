import { createContext, useState } from 'react';
import { useForm } from "react-hook-form";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState('fipePage')
    const fipeForm = useForm();
  return (
    <MyContext.Provider value={{ fipeForm, loading, setLoading, step, setStep }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };