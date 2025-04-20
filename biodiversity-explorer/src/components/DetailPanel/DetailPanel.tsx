import React from "react";
import { Species } from "../../types";
import { motion, AnimatePresence } from "framer-motion";

interface Props { species: Species | null; onClose: () => void; }

export const DetailPanel: React.FC<Props> = ({ species, onClose }) => (
    <AnimatePresence>
        {species && (
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-auto"
            >
                <button onClick={onClose} className="mb-4">Close</button>
                {species.imageUrl && <img src={species.imageUrl} alt={species.commonName} className="w-full h-40 object-cover rounded-lg mb-2" />}
                <h2 className="text-xl font-bold">{species.commonName}</h2>
                <p className="italic text-sm text-gray-600">{species.scientificName}</p>
                <p className="mt-2">Status: {species.status}</p>
                <div className="mt-4">
                    <h3 className="font-semibold">Conservation Actions</h3>
                    <ul className="list-disc ml-5 mt-2">
                        <li><a href="#">Adopt this species</a></li>
                        <li><a href="#">Donate</a></li>
                        <li><a href="#">Share</a></li>
                    </ul>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);