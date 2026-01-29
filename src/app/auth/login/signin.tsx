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

        <form className="w-full h-full border border-gray-200 cursor-pointer rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300" action={formAction}>
            <input type="hidden" name="provider" value={props.provider} />
            <input type="hidden" name="callbackUrl" value={props.callbackUrl} />
            <button
                type="submit"
                className="w-full h-full flex flex-row justify-center items-center"
            >
                <Image width={20} height={20} src={props.srcImage}  alt={`Sign in with ${props.provider}`}/>
                <p className="ml-2"> Sign In </p>
            </button>
        </form>


    )
}

export default SignIn;