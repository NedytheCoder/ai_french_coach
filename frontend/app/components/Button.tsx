interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onPointerCancel?: () => void;
    disabled?: boolean;
}

export default function Button({ children, className, onClick, onPointerDown, onPointerUp, onPointerCancel, disabled }: ButtonProps) {
    return (
        <button className={` ${className} cursor-pointer bg-[#007bff] text-white p-3 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed`} onClick={onClick} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={onPointerCancel} disabled={disabled}>
            {children}
        </button>
    )
}