'use server'

import { revalidatePath } from "next/cache";
import { revalidateTag } from 'next/cache'
import {addMessage, createNewTalk, deleteTalkDb, fetchChatCompletion, fetchMessage} from "@/lib/data";
import {auth} from "@/auth";
import {FetchError} from "@/lib/error";
import {z} from "zod";
import {redirect} from "next/navigation";



export type State = {
    errors?: any;
    success:boolean;
};

const SendPromptSchema = z.object({
    prompt: z.string().min(0),
    talkId: z.string(),
})


const SendFirstPromptSchema = z.object({
    prompt: z.string().trim().min(1, {
        message: "A prompt is required"
    }),
    title: z.preprocess(
        val => (val === "" ? undefined : val),
        z.string().default("Nouvelle discussion")
    ),
})

const withAuthAction = <State, Payload>(
    action: (
        userId: string,
        prevState: State,
        payload: Payload
    ) => Promise<State>
) => {
    return async (prevState: State, payload: Payload): Promise<State> => {
        const session = await auth();

        const userId = session?.user?.id;
        if (!userId) {
            throw FetchError.AccessDenied;
        }
        return action(userId, prevState, payload);
    };
}

export const deleteTalk = async (talkId:string, pathname:string) : Promise<{success:boolean}> => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return {success:false};
    }
    const del = await deleteTalkDb(talkId,userId);
    if (del.success){
        revalidateTag('talk-resume', 'max');
        if(pathname.endsWith(talkId)) redirect('/chatbot')
    }
    return del;
}


export const sendFirstPromptAction = withAuthAction((async (userId , prevState:State,formData:FormData) => {
    const validateFields = SendFirstPromptSchema.safeParse({
        prompt:formData.get("prompt"),
        title:formData.get("title"),
    })

    if(!validateFields.success){
        return {success:false,errors:z.flattenError(validateFields.error).fieldErrors}
    }

    const data = validateFields.data
    const talkId = await createNewTalk(userId,data.title);
    if(!talkId.data){
        console.log(talkId.error)
        return {success:false,}
    }
    revalidateTag('talk-resume', 'max')
    const context = await addMessage({content:data.prompt,role:"user",userId:userId,talkId:talkId.data.id})
    if (!context.data){
        return {success:false,errors:context.error}
    }
    const res = await sendPromptFn(context.data,talkId.data.id,userId);
    redirect(`/chatbot/c/${talkId.data.id}`)

}));



//TODO mettre en queue le sendPromptAction pour chaque user en utilisant le userId Utiliser Redis + Bullmq
export const sendPromptAction = withAuthAction((async (userId , prevState:State,formData:FormData) => {
    const validateFields = SendPromptSchema.safeParse({
        prompt:formData.get("prompt"),
        talkId:formData.get("talkId"),
    })

    if(!validateFields.success){
        return {success:false,errors:FetchError.Default}
    }
    const data = validateFields.data
    console.log(data)
    const context = await addMessage({content:data.prompt,role:"user",userId:userId,talkId:data.talkId})
    if (!context.data){
        return {success:false,errors:context.error}
    }

    revalidatePath(`/chatbot/c/${data.talkId}`);

    return sendPromptFn(context.data,data.talkId,userId)

}));

const sendPromptFn = async (context:fetchMessage,talkId:string, userId:string) => {

    // get le model du form data puis send prompt
    const res = await fetchChatCompletion(context,"mistral-small-2503");

    const answerContent = res.data;
    if (!answerContent){
        return {success:false,errors:res.error}
    }

    const answer = await addMessage({content:answerContent,role:"assistant",userId:userId,talkId:talkId})
    if (!answer.data){
        return {success:false,errors:FetchError.FailedAnswer}
    }
    revalidatePath(`/chatbot/c/${talkId}`);
    return {success:true};
}