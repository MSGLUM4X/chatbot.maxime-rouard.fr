import {TalkProvider} from "@/app/context/talk-context";
import {Suspense} from "react";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <TalkProvider>
            {children}
        </TalkProvider>

    );
}
