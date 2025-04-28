import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import speciesRaw from '../species.json';
import LoadingSpinner from '../utility/LoadingSpinner';
import type { SpeciesRow } from '../hooks/useSpecies';

export const ConservationAction: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [species, setSpecies] = useState<SpeciesRow | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data: SpeciesRow[] = speciesRaw as SpeciesRow[];
                const found = data.find(s => s.id === Number(id));
                if (!found) {
                    setError('Species not found');
                } else {
                    setSpecies(found);
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!species) return null;

    const name = species.common_name || species.scientific_name;

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-6">
            <button onClick={() => navigate(-1)} className="text-sm text-[var(--color-green)] hover:underline cursor-pointer">
                ← Back
            </button>
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="text-lg text-gray-300">{species.summary}</p>
            <div className="flex flex-wrap gap-2">
                {[species.threat_level, species.taxon, species.region].map((label, i) => (
                    <span key={i} className="px-3 py-1 bg-[var(--color-green)] rounded-full text-sm font-medium">
                        {label}
                    </span>
                ))}
            </div>
            <hr className="border-[var(--color-green)]" />
            <div className="prose prose-invert">
                <h2 className='text-2xl font-bold text-center'>Conservation Actions</h2>
                <p className='text-center'>{species.conservation_action}</p>
            </div>
        </div>
    );
};
