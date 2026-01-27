import {redirect} from "next/navigation";

export enum FetchError {
    AccessDenied = "AccessDenied",
    FailedAnswer = "FailedAnswer",
    NotFound = "NotFound",
    Default = "Default"
}

export const redirectError = (error:FetchError) => {
    redirect(`/chatbot/error?error=${error}`)
}

