'use client'

import SignIn from "@/app/auth/login/signin";
import { useSearchParams } from 'next/navigation';


const SignInPage = () =>{
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    return (
        <div className="w-full h-full flex items-center justify-center dark:bg-slate-950">
            <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] shadow-2xl dark:shadow-[#b6b9ca] rounded-2xl flex flex-col p-5 sm:p-20 justify-start items-center dark:bg-[#b6b9ca]">
                <p className="mb-10 sm:mb-20 font-bold font-mono text-5xl inset-0 text-transparent [-webkit-text-stroke:2px_#374151] dark:[-webkit-text-stroke:2px_#0f172a] drop-shadow-xl/50">Connexion</p>
                <div className="w-full h-[50px] sm:h-[60px] mb-10">
                    <SignIn callbackUrl={callbackUrl} provider={"github"} srcImage={"/github.svg"}/>
                </div>
                <div className="w-full h-[50px] sm:h-[60px]">
                    <SignIn callbackUrl={callbackUrl} provider={"google"} srcImage={"/google.svg"}/>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;