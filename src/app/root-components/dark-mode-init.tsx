"use client";

import { useEffect } from "react";

const DarkModeInit = () => {
    useEffect(() => {
        const applyDarkMode = () => {
            try {
                document.documentElement.classList.toggle(
                    "dark",
                    localStorage.theme === "dark" ||
                    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
                );
            } catch (e) {}
        };

        applyDarkMode();

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = () => {
            if (!("theme" in localStorage)) {
                applyDarkMode();
            }
        };

        mediaQuery.addEventListener("change", listener);

        return () => {
            mediaQuery.removeEventListener("change", listener);
        };
    }, []);

    return null;
}

export default DarkModeInit;