import { useNavigate } from "react-router-dom";

export type CardProps = {
    id: number;
    imgUrl: string;
    title: string;
    summary: string;
    labels: string[];
    onSelect: () => void
}

const Card = ({ id, imgUrl, title, summary, labels }: CardProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/conservation/${id}`);
    };

    return (
        <div role="button" className="flex flex-col w-auto h-autp bg-[var(--color-black)] cursor-pointer shadow-xs transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(27,164,118,0.7)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green)] rounded-lg" onClick={handleClick}>
            <div className="h-[55%] w-full"><img src={imgUrl} className="w-full h-full object-cover rounded-t-lg" alt={`Photo of ${title}`} /></div>
            <div className="h-[45%] w-full bg-[var(--color-card-green)] rounded-b-lg p-5">
                <h1 className="text-xl font-bold text-left">{title}</h1>
                <h3 className="text-lg line-clamp-3 overflow-ellipsis mb-2">{summary}</h3>
                <div className="flex items-center justify-start gap-2 flex-wrap">
                    {labels.map((label, id) => {
                        return (
                            <div key={id} className="rounded-sm bg-[var(--color-border-green)] px-1.5 py-0.5 text-center font-bold text-base text-[var(--color-white)]">
                                {label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Card