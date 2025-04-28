import React from 'react';
import Card, { CardProps } from '../card/Card';
import LoadingSpinner from '../../utility/LoadingSpinner';

type CardGridProps = {
    items: CardProps[];                   // Array of card props to render
    onCardSelect: (item: CardProps) => void;  // Callback for when a card is clicked
    loading?: boolean;
    error?: string | "Something went wrong!";
}

const CardGrid: React.FC<CardGridProps> = ({
    items,
    onCardSelect,
    loading,
    error,
}) => {
    // If loading flag is true, show spinner
    if (loading) return <LoadingSpinner />;

    // If there's an error message, display it in red text
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    // Render the grid list of cards
    return (
        <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {items.map(item => (
                <li
                    key={item.title}
                    role="listitem"
                    className="h-auto"
                >
                    {/* Spread all card props into Card component, handle click */}
                    <Card
                        {...item}
                        onSelect={() => onCardSelect(item)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default CardGrid;
