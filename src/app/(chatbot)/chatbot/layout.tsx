import {SessionProvider} from "next-auth/react";
import SideNav from "@/app/(chatbot)/components-layout/side-nav/side-nav";


export default function Layout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <div className="h-full w-full flex flex-row overflow-hidden">
                <SideNav/>
                {children}
            </div>
        </SessionProvider>

    );
}
