'use client'

import {createContext, RefObject, useActionState, useRef} from "react";
import {sendFirstPromptAction, State} from "@/lib/action";
import Form from 'next/form'

interface FormContextType {
    formRef: RefObject<HTMLFormElement|null>,
    isPending:boolean,
    state:State
}

export const FormContext = createContext<FormContextType|null>(null)


const FormClient = ({className, children}: Readonly<{className:string, children: React.ReactNode; }>) => {

    const initialState: State = {success:false};
    const [state, formAction, isPending] = useActionState(sendFirstPromptAction, initialState);

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Form ref={formRef} className={className} action={formAction}>
            <FormContext.Provider value={{
                formRef,
                isPending,
                state,
            }}>
                {children}
            </FormContext.Provider>
        </Form>
)}

export default FormClient;