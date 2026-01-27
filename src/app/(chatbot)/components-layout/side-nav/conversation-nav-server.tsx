'use client'

import Image from "next/image";
import {deleteTalk} from "@/lib/action";
import { usePathname } from 'next/navigation'




const ConversationNavServer = ({talkId}:{talkId:string}) => {
    const pathname = usePathname()

    const handleDelete = async () => {
        const del = deleteTalk(talkId,pathname)
        if(!del){
            //TODO
            console.log("Failed To delete")
        }
    }

    return (
            <div
                onClick={handleDelete}
                className="w-8 cursor-pointer"
            >
                <Image  src= "/icons/delete-svgrepo-com.svg" alt="Supprimer Icon" width={28} height={28} aria-label='Supprimer'/>
            </div>
    )
}

export default ConversationNavServer;