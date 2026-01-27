"use server";

import z from "zod";

const FormScherma = z.object({
    message:z.string().min(5, "Must be at least 5 characters"),
    email:z.email("Need your email to contact you back")
})

export type State = {
    error?: string |null;
    success?: boolean | null;
};

export async function sendContactMail(
    prevState: State,
    formData: FormData
) {
    const message = FormScherma.safeParse({
        message:formData.get("message"),
        email:formData.get("email"),
    })
    if (!message.success){
        return {success:false, error:z.prettifyError(message.error)}
    }

    try {
        //TODO sendMail(msg.data)
        throw "error"
        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: "Erreur lors de l’envoi du mail" };
    }
}