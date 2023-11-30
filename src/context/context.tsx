import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { useForm } from "react-hook-form";

export interface contextInferface {
  step: string
  setStep: Dispatch<SetStateAction<string>>
  fipeForm: any
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
  step: 'fipePage',
  setStep: (step:string) => {},
  fipeForm: () => {},
  loading: false,
  setLoading: (loading:boolean) => {},
} as contextInferface

const MyContext = createContext(defaultState);

const MyContextProvider = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [step, setStep] = useState<string>('fipePage')
    const fipeForm = useForm();
  return (
    <MyContext.Provider value={{ fipeForm, loading, setLoading, step, setStep }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };