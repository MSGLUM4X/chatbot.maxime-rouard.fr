import {auth} from "@/auth";

const WelcomeMessage = async () => {
    const session = await auth();
    return (
        <h1 className="font-bold font-mono text-3xl md:text-7xl tracking-wide border border-black border-2 rounded-full p-6 shadow-[0_10px_30px_rgba(255,255,255,0.6)] bg-gray-100">Bonjour {session?.user?.name || ""}</h1>
    )
}

export default WelcomeMessage;