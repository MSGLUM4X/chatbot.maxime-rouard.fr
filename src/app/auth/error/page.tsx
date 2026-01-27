"use client"


import { useActionState } from 'react';
import { useSearchParams } from "next/navigation"
import Link from "next/link";
import Image from "next/image";
import {sendContactMail, State} from "@/lib/contactAction";


enum Error {
    Configuration = "Configuration",
    AccessDenied = "AccessDenied",
    Verification = "Verification",
    Default = "Default"
}

const errorMap = {
    [Error.Configuration]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
        </p>
    ),
    [Error.AccessDenied]: (
        <p>
            You don't have the right to access this demo. Please contact me if you want
            to access it.
            Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">AccessDenied</code>
        </p>
    ),
    [Error.Verification]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Verification</code>
        </p>
    ),
    [Error.Default]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists.
        </p>
    ),
}

export default function AuthErrorPage() {
    const search = useSearchParams()
    const error = search.get("error") as Error
    const initialState : State = { success: null, error: null };
    const [state, formAction] = useActionState(sendContactMail, initialState);





    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <div
                className="w-4/5 mt-10 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div className="flex flex-row justify-evenly m-4">
                    <Link
                        className="border rounded-lg p-2"
                        href="/"
                    >
                        <Image src="/icons/home-svgrepo-com.svg" width={20} height={20} alt="Retry Login"/>
                    </Link>
                    <Link
                        className="border rounded-lg p-2"
                        href="/auth/login"
                    >
                        <Image src="/icons/dismiss-svgrepo-com.svg" width={20} height={20} alt="Retry Login"/>
                    </Link>
                </div>
                <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Something went wrong
                </h5>
                <div className="font-normal text-gray-700 dark:text-gray-400">
                    {errorMap[error] || "Please contact us if this error persists."}
                </div>
            </div>
            {error==="AccessDenied" && (
                <div
                    className="w-4/5 mt-10 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Ask for access
                    </h5>
                    <div className="font-normal text-gray-700 dark:text-gray-400">
                        <form action={formAction}>
                            <div className="flex flex-row gap-2">
                                <div className="flex-1 flex flex-col gap-3">
                                    <input className="border border-gray-700 rounded-lg p-2" type="email" name="email" placeholder="Votre email"></input>
                                    <textarea className="border border-gray-700 rounded-lg p-2" name="message" placeholder="Votre message"></textarea>
                                </div>
                                <button
                                    className="cursor-pointer"
                                    type="submit"
                                >
                                    <Image src="/icons/send-svgrepo-com.svg" width={20} height={20} alt="Ask for access"/>
                                </button>
                            </div>
                        </form>
                    </div>
                    {state.success === false && <p className="mt-2 font-normal text-gray-700 dark:text-gray-400">{state.error}</p>}
                </div>

            )}

        </div>
    )
}