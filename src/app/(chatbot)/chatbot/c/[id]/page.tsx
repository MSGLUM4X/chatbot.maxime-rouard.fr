import PromptBar from "@/app/(chatbot)/chatbot/c/components-page/prompt-bar";
import TopBar from "@/app/(chatbot)/chatbot/c/components-page/top-bar";
import MessagesContentServer from "@/app/(chatbot)/chatbot/c/components-page/messages-content-server";
import MessagesContentClient from "@/app/(chatbot)/chatbot/c/components-page/messages-content-client";
import {Suspense} from "react";
import FormClient from "@/app/(chatbot)/chatbot/c/components-page/form-client";
import PreFilledInput from "@/app/(chatbot)/chatbot/c/components-page/pre-filled-input";


const ChatPage =  async ({params}:{ params: Promise<{ id: string }> }) => {
    return (
            <FormClient className="relative w-full h-full">
                <Suspense>
                    <PreFilledInput talkId={params}/>
                </Suspense>
                <div className="w-full h-full flex flex-col items-center">
                    <TopBar/>
                    <div className="flex-1 w-full overflow-y-auto bg-gray-200 dark:from-slate-900 dark:bg-gradient-to-t dark:bg-slate-600 dark:bg-slate-700">
                        <MessagesContentClient>
                            <Suspense>
                                <MessagesContentServer talkId={params}/>
                            </Suspense>
                        </MessagesContentClient>
                    </div>
                </div>
                <div className="absolute bottom-10 w-4/5 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center justify-center">
                        <PromptBar/>
                    </div>
                </div>
            </FormClient>
    );
}

export default ChatPage;