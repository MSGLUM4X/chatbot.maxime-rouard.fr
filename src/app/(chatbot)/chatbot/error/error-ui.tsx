'use client'

import Link from "next/link";
import Image from "next/image";
import {FetchError} from "@/lib/error"



const errorMap = {
    [FetchError.NotFound]: (
        <p>
            This talk doesn't exist. Please contact us if this
            error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Not Found</code>
        </p>
    ),
    [FetchError.AccessDenied]: (
        <p>
            You don't have the right to access this talk.
            Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Access Denied</code>
        </p>
    ),
    [FetchError.Default]: (
        <p>
            There was a problem when trying to fetch your talk. Please contact us if this
            error persists. Unique error code:
            Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Default</code>
        </p>
    ),
}

const ErrorUi = async (props: {
    searchParams?: Promise<{
        error?: string;
    }>;
}) => {
    const searchParams = await props.searchParams;
    const error = searchParams?.error as FetchError

    return (
        <div className="flex items-center justify-center h-full w-full ">

            <div
                className="relative w-4/5 mt-10 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow  "
            >
                <div className="absolute right-3 top-3 border rounded-full h-9 w-9 flex items-center justify-center hover:bg-gray-100">
                    <Link
                        className="p-2"
                        href="/chatbot"
                    >
                        <Image src="/icons/dismiss-svgrepo-com.svg" width={20} height={20} alt="Come back home"/>
                    </Link>
                </div>
                <h5 className="mt-5 mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 ">
                    Something went wrong
                </h5>
                <div className="font-normal text-gray-700">
                    { "Please contact us if this error persists."}
                </div>
            </div>
        </div>
    )
}

export default ErrorUi;