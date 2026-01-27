const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent rounded-xl bg-gray-100 m-2 shadow-sm relative overflow-hidden';

const ConversationNavSkeleton = () => {
    return (
        <div className={`mt-3 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/100 before:to-transparent rounded-xl bg-gray-100 m-2 shadow-sm relative overflow-hidden`}>
            <div className="p-2 flex">
                <div className='h-5 w-full p-2 bg-gray-200 rounded-md'/>
            </div>

        </div>
    )
}

export const ConversationsListSkeleton = () => {
    return (
        <>
            <ConversationNavSkeleton/>
            <ConversationNavSkeleton/>
            <ConversationNavSkeleton/>
            <ConversationNavSkeleton/>
            <ConversationNavSkeleton/>
        </>
    )
}

export const WelcomeMessageSkeleton = () => {
    return (
        <div className="flex items-center justify-center h-[50px] md:h-[100px] w-[500px] max-w-2xl p-6 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/100 before:to-transparent rounded-full bg-gray-100 m-2 shadow-sm relative overflow-hidden">
            <div className='h-3/5 w-full p-2 bg-gray-200 rounded-full'/>
        </div>
    )

}

