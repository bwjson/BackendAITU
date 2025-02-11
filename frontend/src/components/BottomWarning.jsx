import { Link } from 'react-router-dom';

export function BottomWarning({ label, bottomText, to }) {
    return (
        <div>
            <p className="text-md text-black text-center">{bottomText + " "}
                <Link to={to} className='underline'>{label}</Link>
            </p>
        </div>
    )
}
