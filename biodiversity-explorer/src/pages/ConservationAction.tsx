import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import speciesRaw from '../species.json';
import LoadingSpinner from '../utility/LoadingSpinner';
import type { SpeciesRow } from '../hooks/useSpecies';

// ConservationAction component shows detailed info for a single species.
// It reads the species ID from the URL, loads matching data from  species.json,
// handles loading and error states, and renders the species details.
export const ConservationAction: React.FC = () => {
    // Grab `id` from the URL params which is in string format
    const { id } = useParams<{ id: string }>();
    // useNavigate hook initialization
    const navigate = useNavigate();

    // Local state: species data, loading flag, and error message
    const [species, setSpecies] = useState<SpeciesRow | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect to load the species once the `id` param changes
    useEffect(() => {
        // IIFE to allow async/await usage inside useEffect
        (async () => {
            try {
                // Cast local JSON to SpeciesRow array
                const data = speciesRaw as SpeciesRow[];
                // Find the species that matches the numeric ID
                const found = data.find(s => s.id === Number(id));
                if (!found) {
                    // No matching species then set an error message
                    setError('Species not found');
                } else {
                    // Matching species found then update state
                    setSpecies(found);
                }
            } catch (e: unknown) {
                // Catch any errors during lookup and normalize message
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            } finally {
                // Always stop the loading spinner
                setLoading(false);
            }
        })();
    }, [id]); // Re-run effect if `id` changes

    // If still loading data, show spinner
    if (loading) return <LoadingSpinner />;
    // If there was an error, display it in red text
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    // If species is null (shouldn't happen after loading), render nothing
    if (!species) return null;

    // Determine display name: use common name if available
    const name = species.common_name || species.scientific_name;

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-[var(--color-green)] hover:underline cursor-pointer"
            >
                ← Back
            </button>

            <h1 className="text-4xl font-bold">{name}</h1>

            <p className="text-lg text-gray-300">{species.summary}</p>

            <div className="flex flex-wrap gap-2">
                {[species.threat_level, species.taxon, species.region].map((label, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 bg-[var(--color-green)] rounded-full text-sm font-medium"
                    >
                        {label}
                    </span>
                ))}
            </div>

            <hr className="border-[var(--color-green)]" />

            <div className="prose prose-invert">
                <h2 className="text-2xl font-bold text-center">Conservation Actions</h2>
                <p className="text-center">{species.conservation_action}</p>
            </div>
        </div>
    );
};
