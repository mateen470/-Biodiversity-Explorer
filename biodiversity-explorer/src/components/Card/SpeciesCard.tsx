import React from "react";
import { Species } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

interface Props { species: Species; onClick: (s: Species) => void; }

export const SpeciesCard: React.FC<Props> = ({ species, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-2xl shadow p-4 cursor-pointer"
        onClick={() => onClick(species)}
    >
        {species.imageUrl && (
            <LazyLoadImage
                src={species.imageUrl}
                alt={species.commonName}
                effect="blur"
                className="w-full h-32 object-cover rounded-lg mb-2"
            />
        )}
        <h3 className="text-lg font-semibold">{species.commonName}</h3>
        <p className="text-sm text-gray-500">{species.status}</p>
    </motion.div>
);