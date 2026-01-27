"use client";

import Link from "next/link";

export const SignInButton = (props:{className?:string}) => {
    return (
        <Link
            href="/auth/login"
            className={props.className}
        >
            Sign In
        </Link>
    )
}