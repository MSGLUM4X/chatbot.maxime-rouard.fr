'use client'

import SignIn from "@/app/auth/login/signin";
import { useSearchParams } from 'next/navigation';

const SignInPage = () =>{
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/chatbot';

    return <SignIn callbackUrl={callbackUrl} provider={"github"} srcImage={"/github.svg"}/>

}

export default SignInPage;