import {fetchMessage} from "@/lib/data";

//TODO Créér les types de response de chat completion

export const chatCompletion = async (context:fetchMessage,model:string) => {
    return await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY_MISTRAL}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: model,
            messages: context
        })
    });
}

export const getModels = async () => {
    return await fetch("https://api.mistral.ai/v1/models", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY_MISTRAL}`,
            "Content-Type": "application/json"
        },
    });
}