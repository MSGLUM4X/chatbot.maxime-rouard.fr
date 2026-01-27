'use client'

import {useContext, useState} from "react";
import Image from "next/image";
import {FormContext} from "@/app/(chatbot)/chatbot/c/components-page/form-client";


const PromptBar = () => {

    //TODO La hauteur du text area doit augmenter en fonction de sa taille jusqu'a une certaine limite

    const context = useContext(FormContext);
    if (!context){
        return null;
    }
    const {formRef, isPending} = context;
    const [prompt,setPrompt] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const submitForm = () => {
        formRef.current?.requestSubmit()
        setPrompt("")
    }

    const handleClickSubmit = (e:React.MouseEvent) => {
        e.preventDefault();
        submitForm();
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            submitForm();
        }
    };

    return (
        <div className="w-4/5 max-w-4xl bg-gray-100 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 ">
            <div className="mt-2 mb-2 mx-auto p-3">
                <div className="flex items-end gap-2 ">

                    <button
                        className="max-md:hidden p-3 border-gray-400 rounded-lg border bg-gray-200 text-white"
                        title="Paramètres du modèles"
                    >
                        <Image src="/icons/options-svgrepo-com.svg" alt="Send" width={24} height={24}/>
                    </button>


                    <button
                        className="max-md:hidden p-3 border-gray-400 border rounded-lg bg-gray-200 text-white"
                        title="Joindre un fichier"
                    >
                        <Image src="/icons/folder-add-svgrepo-com.svg" alt="Send" width={24} height={24}/>
                    </button>

                    <textarea
                        name="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Écrivez votre prompt..."
                        rows={1}
                        className="flex-1 bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none min-h-[48px] max-h-32"
                    />


                    <button
                        className="max-md:hidden p-3 border-gray-400 border rounded-lg bg-gray-200 text-white"
                    >
                        <Image src="/icons/microphone-svgrepo-com.svg" alt="Send" width={24} height={24}/>
                    </button>


                    <button
                        className="cursor-pointer p-3 h-min-content border-gray-400 border rounded-lg bg-gray-200"
                        type="button"
                        onClick={handleClickSubmit}
                    >
                        <Image src="/icons/send-svgrepo-com.svg" alt="Send" width={24} height={24}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PromptBar;