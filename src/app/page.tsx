import {SignInButton} from "@/app/components/sign-in-button";

const HomePage = () => {
    return (
        <div className="h-full w-full flex flex-col justify-evenly items-center">
            <h1>Home</h1>
            <div>
                <SignInButton className="bg-gray-100 rounded-lg border p-4"/>
            </div>
        </div>
    )
}

export default HomePage;