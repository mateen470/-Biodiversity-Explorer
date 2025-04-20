import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type SortOption = 'name' | 'status'

interface SortProps {
    sortKey: SortOption
    onChange: (key: SortOption) => void
}

const OPTIONS: SortOption[] = ['name', 'status']

export const Sort: React.FC<SortProps> = ({ sortKey, onChange }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative inline-block text-left">
            <motion.button
                onClick={() => setOpen(o => !o)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Sort: {sortKey === 'name' ? 'A–Z' : 'Threat'}
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-10"
                    >
                        {OPTIONS.map(opt => (
                            <motion.li
                                key={opt}
                                onClick={() => { onChange(opt); setOpen(false) }}
                                whileHover={{ backgroundColor: '#F3F4F6' }}
                                className={`
                  px-4 py-2 cursor-pointer text-sm
                  ${opt === sortKey ? 'font-semibold bg-gray-100' : 'font-normal'}
                `}
                            >
                                {opt === 'name' ? 'Name (A–Z)' : 'Threat Level'}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}
