export default function FooterHome(){
    return (
        <footer className="relative border-t border-orange-500/20 bg-black/30 backdrop-blur-xl">
            <div className="mx-auto px-6 py-8">
                <div className="flex flex-col justify-between items-center space-y-4 ">
                    <div className="text-gray-400 text-sm">
                        © 2026 Maxime Rouard - Tous droits réservés
                    </div>
                    <div className="flex items-center space-x-2 text-orange-400">
                        <span className="text-sm">Propulsé par Maxime Rouard</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}