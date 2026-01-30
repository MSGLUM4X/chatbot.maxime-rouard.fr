'use client'

import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {deleteTalk} from "@/lib/action";

const ConversationNav = ({title,id,talkId}:Readonly<{title:string,id:string,talkId:string}>) => {
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
            className={clsx(
                'flex flex-row justify-between items-center max-w-full',
                pathname.endsWith(talkId) && 'bg-gray-300',
            )}
        >
            <Link
                href={`/chatbot/c/${id}`}
                className={`p-4 flex-1 min-w-0 cursor-pointer transition-all duration-200`}
            >
                <div className="flex items-start justify-between gap-3 min-w-0">
                    <div className="flex-1 min-w-0">
                        <h3 className='text-sm font-medium min-w-0 truncate mb-1 text-gray-700'>
                            {title}
                        </h3>
                    </div>
                </div>
            </Link>

            <div
                onClick={handleDelete}
                className='w-8 cursor-pointer'
            >
                <Image  src= "/icons/delete-svgrepo-com.svg" alt="Supprimer Icon" width={28} height={28} aria-label='Supprimer'/>
            </div>
        </div>
    )
}

export default ConversationNav;