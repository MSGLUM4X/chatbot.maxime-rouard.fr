"use client"

import { signOut } from "next-auth/react"

export default function LogOutButton() {
    return <button className="cursor-pointer bg-gray-50 p-2 mt-2 rounded-lg hover:bg-amber-100" onClick={() => signOut({ redirectTo: "/" })}>Log Out</button>

}