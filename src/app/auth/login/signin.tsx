'use client';

import {handleSignIn} from "@/lib/auth/signInServerAction";
import { useActionState } from 'react';
import Image from "next/image";

export function SignIn(props:{callbackUrl:string, provider:string, srcImage:string}) {


    const [_, formAction] = useActionState(
        handleSignIn,
        undefined,
    );

    return (

        <form className="dark:bg-slate-500 w-full h-full border border-gray-200 dark:border-slate-900 cursor-pointer rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300" action={formAction}>
            <input type="hidden" name="provider" value={props.provider} />
            <input type="hidden" name="callbackUrl" value={props.callbackUrl} />
            <button
                type="submit"
                className="cursor-pointer w-full h-full flex flex-row justify-center gap-10 items-center"
            >
                <Image width={30} height={30} src={props.srcImage}  alt={`Sign in with ${props.provider}`}/>
                <p className="transition-all duration-600 font-bold font-mono text-sm dark:text-slate-900"> {`Sign in with ${props.provider}`}</p>
            </button>
        </form>


    )
}

export default SignIn;