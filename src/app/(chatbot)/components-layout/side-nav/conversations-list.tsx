import {fetchTalksList} from "@/lib/data";
import ConversationNav from "@/app/(chatbot)/components-layout/side-nav/conversation-nav";
import { cacheTag } from 'next/cache'
import {Session} from "@auth/core/types";



const ErrorDataFetch = (props:{error?:string}) => {
    return (<p className="p-4 text-justify">
            Sorry, we failed to load your previous talks.
            Please contact us if this
            error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">{props.error || "Default"}</code>
    </p>
    );
}

const ConversationsList = async (props:{session:Session}) => {
    'use cache';
    cacheTag('talk-resume');

    if (!props.session?.user?.id) {
        return <ErrorDataFetch error="Session Id"/>
    }
    const data = await fetchTalksList(props.session.user.id);
    if (!data.talks){
        return <ErrorDataFetch error={data.error}/>
    }




    return (
        <>
            {data.talks.map((conv,key) => (
                <ConversationNav key= {key} id={conv.id} title={conv.title} talkId={conv.id} />
            ))}
        </>
    )
}

export default ConversationsList;