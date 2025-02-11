
export function Button({ children, className, onClick, disabled }) {
    return (
        <button disabled={disabled} onClick={onClick} type="submit" className={`px-6 py-2 bg-black text-white rounded ${className}`}>{children}</button>
    )
}
