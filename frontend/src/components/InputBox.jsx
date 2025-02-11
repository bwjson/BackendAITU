
export function InputBox({ type = "text", label, placeholder, className, onChange }) {
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input type={type} placeholder={placeholder} onChange={onChange} className={`p-1.5 focus:ring-0 border border-gray-300 focus:border-gray-500 ${className}`} />
    </div>

}