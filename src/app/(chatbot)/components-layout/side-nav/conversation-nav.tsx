'use client'

import Link from "next/link";

const ConversationNav = ({title,id,children}:Readonly<{title:string,id:string,children:React.ReactNode;}>) => {

    return (
        <div className='flex flex-row justify-between items-center max-w-full'>
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
            {children}
        </div>
    )
}

export default ConversationNav;