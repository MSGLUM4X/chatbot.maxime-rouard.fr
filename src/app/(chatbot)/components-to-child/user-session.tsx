import {auth} from "@/auth";
import {Session} from "@auth/core/types";
import {redirect} from "next/navigation";


const UserSession = async ({children}: Readonly<{ children: (session: Session) => React.ReactNode;}>) => {

    const session = await auth();
    if (!session){
        redirect(`/login`)
        return null;
    }

    return (
        <>
            {children(session)}
        </>
    )
}

export default UserSession;