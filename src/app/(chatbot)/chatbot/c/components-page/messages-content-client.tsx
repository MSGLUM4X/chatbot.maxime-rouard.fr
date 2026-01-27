'use client'


import {useContext, useEffect, useRef} from "react";
import {FormContext} from "@/app/(chatbot)/chatbot/c/components-page/form-client";

const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent  shadow-sm relative overflow-hidden';

const MessagesContentClient = ({children,}: Readonly<{ children: React.ReactNode; }>) => {
    const context = useContext(FormContext);
    if (!context){
        return null;
    }
    const {isPending} = context;

    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = bottomRef.current;
        if (!el) return;

        const observer = new ResizeObserver(() => {
            el.scrollIntoView({ behavior: "smooth" });
        });

        observer.observe(el.parentElement!);

        return () => observer.disconnect();
    }, []);
    return (
          <div className="mb-50">
              {children}
              {isPending && (
                  <div className="m-15">
                      <div className="flex items-center justify-center">
                          <article className={`${shimmer} p-4 w-4/5 max-w-4xl rounded-2xl shadow-md bg-white`}>
                              <div className={` p-2 text-center font-bold`}>
                                  <p>Chargement</p>
                              </div>
                          </article>
                      </div>
                  </div>
              )}
              <div ref={bottomRef}/>
          </div>
    )
}

export default MessagesContentClient;