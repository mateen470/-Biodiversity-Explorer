import { useNavigate } from "react-router-dom";

// Card component renders a single species summary card
// It shows an image, title, summary, labels, and handles navigation on click
export type CardProps = {
    id: number;
    imgUrl: string;
    title: string;
    summary: string;
    labels: string[];
    onSelect: () => void
}

const Card = ({ id, imgUrl, title, summary, labels }: CardProps) => {
    // useNavigate hook initialization
    const navigate = useNavigate();

    // When the card is clicked, navigate to the ConservationActions page for this species
    const handleClick = () => {
        navigate(`/conservation/${id}`);
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
            onClick={handleClick}
            className="
                flex flex-col w-auto h-auto
                bg-[var(--color-black)] cursor-pointer
                shadow-xs transition-shadow duration-300
                hover:shadow-[0_0_20px_rgba(27,164,118,0.7)]
                focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]
                rounded-lg
            "
        >
            <div className="h-[55%] w-full overflow-hidden">
                <img
                    src={imgUrl}
                    alt={`Photo of ${title}`}
                    className="w-full h-full object-cover rounded-t-lg"
                />
            </div>

            <div className="h-[45%] w-full bg-[var(--color-card-green)] rounded-b-lg p-5 flex flex-col">
                <h1 className="text-xl font-bold text-left">{title}</h1>

                <h3 className="text-lg line-clamp-3 overflow-ellipsis mb-2">{summary}</h3>

                <div className="flex items-center justify-start gap-2 flex-wrap">
                    {labels.map((label, idx) => (
                        <div
                            key={idx}
                            className="
                                rounded-sm bg-[var(--color-border-green)]
                                px-1.5 py-0.5 text-center font-bold text-base
                                text-[var(--color-white)]
                            "
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Card;
