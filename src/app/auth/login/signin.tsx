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
        <>
            <form action={formAction}>
                <input type="hidden" name="provider" value={props.provider} />
                <input type="hidden" name="callbackUrl" value={props.callbackUrl} />
                <button
                    type="submit"
                    className="bg-gray-50 cursor-pointer p-6 rounded-lg border flex felx-row"
                >
                    <Image width={20} height={20} src={props.srcImage}  alt={`Sign in with ${props.provider}`}/>
                    <p className="ml-2"> Sign In </p>
                </button>
            </form>
        </>


    )
}

export default SignIn;