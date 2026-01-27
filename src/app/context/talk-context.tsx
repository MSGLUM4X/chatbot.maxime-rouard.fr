'use client'

import {createContext, Dispatch, JSX, ReactNode, SetStateAction, useContext, useMemo, useState} from "react";

/**
 * Ce type définit
 */
type ChatElement = {

}

/** type pour le contexte  */
export interface TalkContextType {
    title:string,
}

/**

 */
export const TalkContext = createContext<TalkContextType | null>(null);

/**

 */
export function TalkProvider({children}: { children: ReactNode }): JSX.Element {

    const title = ""

    return (
        <TalkContext.Provider value={{
            title
        }}>
            {children}
            </TalkContext.Provider>
    );
}




/**
 * Hook permettant l'accès en écriture au `useState AppStateProvider.setUserInput`
 * @returns la fonction de set
 *
 * Dispatch<SetStateAction<string>>
 */
export function useTitle(): string {
    const context = useContext(TalkContext);
    if (!context) {
        throw new Error("useSetAppFlag must be used inside an <TalkProvider>");
    }
    return context.title;
}
