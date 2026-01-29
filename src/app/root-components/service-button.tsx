const ServiceButton = () => {

    return (
        <div
            className={`bg-white/60 h-[70px] cursor-pointer shadow-2xl rounded-2xl flex flex-row items-center justify-start group transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl`}
        >
            <div className='flex-1 flex items-center justify-center'>
                <div className={`transition-all duration-300  font-bold font-mono text-lg`}>
                    In coming
                </div>
            </div>

        </div>
    )
}
export default ServiceButton;