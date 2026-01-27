import SideNavClient from "@/app/(chatbot)/components-layout/side-nav/side-nav-client";
import ConversationsList from "@/app/(chatbot)/components-layout/side-nav/conversations-list";
import {Suspense} from 'react';
import {ConversationsListSkeleton} from "@/ui/skeleton";
import UserSession from "@/app/(chatbot)/components-to-child/user-session";



const SideNav = () => {
    return (
        <SideNavClient>
            <Suspense fallback={<ConversationsListSkeleton/>}>
                <UserSession>
                    {(session) => (
                        <ConversationsList session={session}/>
                    )}
                </UserSession>
            </Suspense>
        </SideNavClient>
    )
}

export default SideNav;