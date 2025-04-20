import React from 'react'
import { motion } from 'framer-motion'

interface Filters {
    region: string[]
    habitat: string[]
    threatLevel: string[]
}

interface FilterProps {
    filters: Filters
    onChange: (key: keyof Filters, value: string) => void
}

const OPTIONS: Record<keyof Filters, string[]> = {
    region: ['Africa', 'Asia', 'Europe', 'Americas'],
    habitat: ['Forest', 'Savannah', 'Wetland', 'Coastal'],
    threatLevel: ['Vulnerable', 'Endangered', 'Critically Endangered'],
}

export const Filter: React.FC<FilterProps> = ({ filters, onChange }) => (
    <div className="flex flex-wrap gap-2">
        {(Object.keys(OPTIONS) as (keyof Filters)[]).map(key => (
            <div key={key} className="flex gap-1">
                {OPTIONS[key].map(opt => {
                    const active = filters[key].includes(opt)
                    return (
                        <motion.button
                            key={opt}
                            onClick={() => onChange(key, opt)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                px-3 py-1 rounded-full text-sm font-medium transition
                ${active
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
                        >
                            {opt}
                        </motion.button>
                    )
                })}
            </div>
        ))}
    </div>
)
