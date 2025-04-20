import React from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Filters } from "../../types";

interface Props {
    filters: Filters;
    onChange: (key: keyof Filters, values: string[]) => void;
}

const options = {
    region: ['Africa', 'Asia', 'Europe', 'Americas'],
    habitat: ['Forest', 'Savannah', 'Wetland', 'Coastal'],
    threatLevel: ['Vulnerable', 'Endangered', 'Critically Endangered'],
};

export const FilterPills: React.FC<Props> = ({ filters, onChange }) => (
    <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(options) as (keyof Filters)[]).map(key => (
            <ToggleButtonGroup
                key={key}
                value={filters[key]}
                onChange={(_, vals) => onChange(key, vals as string[])}
                aria-label={key}
            >
                {options[key].map(opt => (
                    <ToggleButton key={opt} value={opt}>{opt}</ToggleButton>
                ))}
            </ToggleButtonGroup>
        ))}
    </div>
);