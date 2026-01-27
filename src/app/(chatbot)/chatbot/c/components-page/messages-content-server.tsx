import {auth} from "@/auth";
import {fetchMessage} from "@/lib/data";
import {redirectError, FetchError} from "@/lib/error";
import MessageContent from "@/app/(chatbot)/chatbot/c/components-page/message-content";

const MessagesContentServer = async (props:{ talkId: Promise<{ id: string }> }) => {
    const {id} = await props.talkId;
    const session = await auth();
    if (!session?.user?.id) {
        redirectError(FetchError.Default)
        return null;
    }
    const result = await fetchMessage({idUser:session.user.id,idTalk:id})
    if (!result.data){
        redirectError(result.error as FetchError)
        return null;
    }

    return (
        <div className="m-15">
            <div className="flex flex-col items-center gap-20">
                {
                    result.data.map((message,key) => (
                        <MessageContent key={key} role={message.role} content={message.content}/>
                    ))
                }
            </div>
        </div>
    );
}

export default MessagesContentServer;