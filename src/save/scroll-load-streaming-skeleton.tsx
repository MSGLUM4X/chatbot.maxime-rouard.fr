import { useState, useEffect, useRef, useCallback } from 'react';

// Skeleton pour un élément de liste
const ItemSkeleton = () => (
    <div className="bg-white rounded-lg shadow p-4 mb-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
);

// Composant principal
export default function InfiniteScrollList() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    const observerTarget = useRef(null);

    // Fonction pour charger les données
    const fetchItems = useCallback(async (pageNum) => {
        if (loading) return;

        setLoading(true);

        try {
            // Simuler un appel API à votre base de données
            // Remplacez cette partie par votre vraie requête
            const response = await fetch(`/api/items?page=${pageNum}&limit=10`);

            // Simulation avec timeout pour démonstration
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Données simulées - remplacez par vos vraies données
            const newItems = Array.from({ length: 10 }, (_, i) => ({
                id: (pageNum - 1) * 10 + i + 1,
                title: `Élément ${(pageNum - 1) * 10 + i + 1}`,
                description: `Description de l'élément ${(pageNum - 1) * 10 + i + 1}`
            }));

            // Simuler la fin des données après 5 pages
            if (pageNum >= 5) {
                setHasMore(false);
            }

            setItems(prev => [...prev, ...newItems]);
            setInitialLoad(false);
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    // Intersection Observer pour détecter quand on arrive en bas
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading]);

    // Charger les données quand la page change
    useEffect(() => {
        fetchItems(page);
    }, [page, fetchItems]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Ma Liste Infinie
                </h1>

                {/* Skeletons lors du chargement initial */}
                {initialLoad && (
                    <div>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <ItemSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Liste des éléments chargés */}
                {!initialLoad && (
                    <>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Skeletons pendant le chargement au scroll */}
                        {loading && !initialLoad && (
                            <div className="mt-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <ItemSkeleton key={i} />
                                ))}
                            </div>
                        )}

                        {/* Élément observé pour l'infinite scroll */}
                        {hasMore && (
                            <div ref={observerTarget} className="h-10 mt-4"></div>
                        )}

                        {/* Message de fin */}
                        {!hasMore && (
                            <div className="text-center py-8 text-gray-500">
                                Plus d'éléments à charger
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}