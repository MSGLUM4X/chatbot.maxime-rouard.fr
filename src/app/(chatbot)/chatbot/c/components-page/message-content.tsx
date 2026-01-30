import type { Role } from '@/generated/prisma/enums';
import clsx from 'clsx';

const MessageContent = (props:{role:Role,content:string}) => {
    return (
        <article className={clsx('p-4 w-4/5 max-w-4xl rounded-2xl shadow-md',
            {
                'bg-gray-500 text-white dark:bg-slate-800 dark:text-slate-200': props.role === "user",
                'bg-white dark:bg-slate-200 dark:text-slate-900': props.role === "assistant",
            })}>
            <div className="flex flex-end p-2 text-justify">
                <div className="text-wrap wrap-anywhere" dangerouslySetInnerHTML={{ __html: props.content }}/>
            </div>
        </article>
    )
}

export default MessageContent;