'use client'

import {createContext, RefObject, useActionState, useRef} from "react";
import {sendPromptAction, State} from "@/lib/action";
import Form from 'next/form'

interface FormContextType {
    formRef: RefObject<HTMLFormElement|null>,
    isPending:boolean,
}

export const FormContext = createContext<FormContextType|null>(null)

const FormClient = ({className, children}: Readonly<{className:string, children: React.ReactNode; }>) => {
    const initialState: State = {success:true};
    const [state, formAction, isPending] = useActionState(sendPromptAction, initialState);

    const formRef = useRef<HTMLFormElement>(null);


    return (
        <Form ref={formRef} className={className} action={formAction}>
            <FormContext.Provider value={{
                formRef,
                isPending
            }}>
                {children}
            </FormContext.Provider>
        </Form>
    )
}

export default FormClient;