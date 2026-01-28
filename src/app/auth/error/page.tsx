import {Suspense} from "react";
import ErrorClient from "@/app/auth/error/error-client";


const ErrorPage = () => {
    return (
        <Suspense>
            <ErrorClient/>
        </Suspense>
    )
}

export default ErrorPage;