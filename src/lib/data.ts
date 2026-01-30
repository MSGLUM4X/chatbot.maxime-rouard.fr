import prisma from '@/lib/prisma'
import type { Role } from '@/generated/prisma/enums';
import {FetchError} from "@/lib/error";
import {chatCompletion, getModels} from "@/lib/mistral";
import { marked } from "marked";


type TalkResume = {
    id:string,
    title:string,
}


type Talk = {
    id?:string,
    userId?:string,
    title:string,
    messages: Message[],
    createdAt?: Date,
    updatedAt?: Date,
}

export type Message = {
    id?:string,
    role:Role,
    content:string,
    createdAt:Date,
}



type LLMModel = {
    id?:string,
    model:string,
    temperature?:number,
    updateAt:Date,
    talk?:Talk,
}

const SelectMessage = {
    content:true,
    role:true,
}
type SelectMessageType = Pick<Message,"content"|"role">
export type fetchMessage = SelectMessageType[]



export const createNewTalk = async (userId:string,title:string,model:string): Promise<{error?:any, data?:any}> => {
    try {
        const userTalk = await  prisma.talk.create({
            data: {
                title:title,
                user:{
                    connect:{
                        id:userId,
                    }
                },
                llmModel:{
                    create:{
                        model:model,
                        temperature:1,
                    },
                }
            },
            select:{
                id:true
            }
        })
        return {
            data:userTalk,
        }
    } catch (err){
        return {
            error: err
        }
    }
}

export const fetchTalksList = async (id:string) : Promise<{error?:string, talks?:TalkResume[]}> => {
    try {
        const userTalks = await prisma.user.findUnique({
            where: {id: id},
            select: {
                talks: {
                    select: {
                        title: true,
                        id: true,
                    },
                },
            },
        })
        if (!userTalks || !userTalks.talks){
            return {
                error:"No corresponding Id",
            };
        }
        return {
            talks:userTalks.talks
        };
    } catch {
        return {
            error:"Failed to reach db",
        };
    }
}




export const addMessage = async ({content, role, userId, talkId}:{content:string,role:Role,userId:string,talkId:string}) : Promise<{error?:FetchError , data?:fetchMessage}> => {
    try{
        const data = await prisma.talk.update({
            where:{
                id:talkId,
                userId:userId
            },
            data:{
                messages: {
                    create: {
                        content:content,
                        role:role,
                    }
                },
            },
            select:{
                messages:{
                    select:SelectMessage,
                }
            }
        })
        const context = data.messages
        if(!context){
            throw FetchError.NotFound
        }
        return {data:context||[]};
    } catch (err){
        console.log(err)
        return {error: Object.values(FetchError).includes(err as FetchError) ? err as FetchError : FetchError.Default}

    }
}



export const fetchMessage = async ({idUser,idTalk}:{idUser:string,idTalk:string}) : Promise<{data?:fetchMessage,error?:FetchError}> => {
    try{
        const data = await prisma.talk.findUnique({
            where:{
                id:idTalk,
                userId:idUser,
            },
            select:{
                messages:{
                    select: SelectMessage,
                    orderBy: {createdAt: 'asc'}
                }
            }
        })
        if(!data){
            throw FetchError.NotFound
        }
        return {data:data.messages}
    } catch (err){
        return {error: Object.values(FetchError).includes(err as FetchError) ? err as FetchError : FetchError.Default}
    }
}

export const fetchChatCompletion = async (context:fetchMessage,model:string) => {
    const res = await chatCompletion(context, model);
    if (!res.ok){
        return {error:FetchError.FailedAnswer};
    }
    const data = await res.json();
    //TODO SANITIZE
    const dataSanitize = await marked.parse(data.choices[0].message.content);
    return {data: dataSanitize}

}

export const fetchGetModels = async () => {
    const res = await getModels();
    if (!res.ok){
        return {error:FetchError.FailedAnswer};
    }
    const data = await res.json();
    return {data: data}

}

export const deleteTalkDb = async (talkId:string,userId:string) : Promise<{success:boolean}> => {
    try {
        const del = await prisma.talk.delete({
            where:{
                id:talkId,
                userId:userId
            },
            select:{
                id:true
            }
        })
        if (!del.id){
            return {success:false};
        }
        return {success:true};
    } catch (err){
        console.log(err)
        return {success:false};
    }
}
