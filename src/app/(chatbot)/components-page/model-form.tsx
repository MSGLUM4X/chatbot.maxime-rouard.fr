'use client'

import {useEffect, useState} from "react";

const ModelForm = () => {

    const [models, setModels] = useState([])

    useEffect( () => {
        const fetchModel = async () => {
            const data = await fetch('/api/models');
            const models = (await data.json())
            console.log(models)
            setModels(models)
        }
        fetchModel()

    },[])

    return (
        <div className="w-2/5 h-[50px] bg-gray-100 dark:bg-slate-200 p-2 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <select
                name="model"
                className="cursor-pointer w-full h-full text-sm placeholder:text-gray-500 focus:outline-none font-bold text-slate-500 dark:text-slate-500"
                defaultValue=""
            >
                <option value="" disabled>
                    Select a model
                </option>
                {models.map((model,key) => (
                    <option className="cursor-pointer" key={key} value={model.name as string}>
                        {model.name}
                    </option>
                ))}
            </select>
        </div>


    )
}

export default ModelForm;