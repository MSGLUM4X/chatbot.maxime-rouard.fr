import Link from "next/link";
import Image from "next/image";
import ParticlesBg from "@/app/root-components/particles-bg";
import ServiceButton from "@/app/root-components/service-button";
import MistralButton from "@/app/root-components/mistral-button";


const HomePage = () => {
    return (
        <div className="relative h-full w-full overflow-hidden bg-slate-950">
            <ParticlesBg/>
            <div className="h-full flex flex-col items-center gap-20">
                <div className="w-full h-15 mt-5 flex justify-center">
                    <div className="flex-1 max-w-5xl h-full flex items-center justify-between">
                        <Link
                            href="https://maxime-rouard.fr"
                            className="bg-white/70 ml-5 backdrop-blur-sm shadow-xl rounded-full p-4 flex items-center justify-center gap-2 text-slate-700 hover:scale-106  hover:shadow-sm transition-all duration-300"
                        >
                            <Image className="mb-1" width={20} height={20} src={"/icons/home-svgrepo-com.svg"}  alt="Return Home"/>

                            <p className="font-medium">Portfolio</p>
                        </Link>
                        <div
                            className="bg-white/70 cursor-pointer mr-5 backdrop-blur-sm shadow-xl rounded-full  p-4 flex items-center justify-center gap-2 text-slate-700 hover:scale-106  hover:shadow-sm transition-all duration-300"
                        >
                            Mon profil
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full flex items-center justify-center">
                    <div className="bg-white/10 flex-1 w-3/5 h-1/2 sm:h-3/4 sm:w-full max-w-sm backdrop-blur-sm shadow-2xl rounded-2xl mb-10 flex flex-col justify-evenly items-center hover:shadow-sm transition-all duration-500">
                        <div className="flex flex-col gap-20 max-w-xs w-3/5">
                            <MistralButton callBackUrl={"callbackUrl=/chatbot"}/>
                            <ServiceButton/>
                        </div>
                    </div>
                </div>

            </div>
        </div>




    )
}

export default HomePage;
