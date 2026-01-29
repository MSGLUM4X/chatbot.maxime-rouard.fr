import styles from "@/ui/styles/logo-mistral.module.css";
import Link from "next/link";

const MistralButton = () => {

    return (
        <Link
            className={`h-[70px] cursor-pointer shadow-2xl rounded-2xl flex flex-row items-center justify-start group transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl bg-[linear-gradient(135deg,_rgba(10,_10,_10,_0.56)_0%,_#1a1a2e_100%)] dark:bg-white`}
            href="/auth/login"
        >
            <div className={`ml-5 transition-all duration-300 group-hover:rotate-360  ${styles.mistralLogo}`}>
                <div className={styles.pixel1}></div>
                <div className={styles.pixel2}></div>
                <div className={styles.pixel3}></div>
                <div className={styles.pixel4}></div>
                <div className={styles.pixel5}></div>
                <div className={styles.pixel6}></div>
                <div className={styles.pixel7}></div>
                <div className={styles.pixel8}></div>
                <div className={styles.pixel9}></div>
                <div className={styles.pixel10}></div>
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <div className={`transition-all duration-300 group-hover:scale-105 font-bold font-mono text-lg bg-gradient-to-br from-[#ff7000] to-[#ff9d4d] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]`}>
                    Chatbot Mistral
                </div>
            </div>

        </Link>
    )
}
export default MistralButton;