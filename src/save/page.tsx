import styles from "@/styles/login.module.css";
import Link from 'next/link';

export default function HomePage(){
  return (
    <>
        <div className={styles.mistralLogo}>
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

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
              className="cursor-pointer w-60 py-5 flex justify-center bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white rounded-2xl text-lg font-bold "
              href={"/login"}
          >
              <p className="text-center">Tester la démo</p>
          </Link>

          <button className="cursor-pointer w-60 py-5 flex justify-center bg-white/5 backdrop-blur-sm text-white border-2 border-orange-500/50 rounded-2xl text-lg font-bold">
            <p>Demander une démo</p>
          </button>
        </div>

        {/* Info Badge */}
        <div className="inline-flex items-center space-x-2 text-orange-300/80 text-sm">
          <p>Démo accessible à tous les employés Mistral</p>
        </div>
    </>
  );
};