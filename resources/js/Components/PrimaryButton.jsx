import { Link } from "@inertiajs/react";

export default function PrimaryButton({
    as = 'button',
    href,
    disabled = false,
    className = '',
    children,
    ...props
}) {
    const baseClasses =
    `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled ? 'opacity-25 pointer-events-none' : ''}`;

    if (as === 'link') {
        return (
            <Link href={href}
            className={`${baseClasses} ${className}`} {...props}>
            {children}
            </Link>
        );
    } return (
        <button {...props}
        className={`${baseClasses} ${className}`}
        disabled={disabled}>
            {children}
        </button>
    )
}
