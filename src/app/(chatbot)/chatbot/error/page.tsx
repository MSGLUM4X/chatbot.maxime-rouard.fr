import {Suspense} from "react";
import ErrorUi from "@/app/(chatbot)/chatbot/error/error-ui";


const ErrorPage = () => {
    return (
        <Suspense>
            <ErrorUi/>
        </Suspense>
    )
}

export default ErrorPage;