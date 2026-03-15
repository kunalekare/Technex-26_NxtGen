import React from 'react';

interface InputProps {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    suffix?: string;
    helperText?: string;
    disabled?: boolean;
}

export const Input = ({ id, label, value, onChange, suffix, helperText, disabled }: InputProps) => {
    return (
        <div className={`flex flex-col space-y-2 w-full ${disabled ? 'opacity-50' : ''}`}>
            <label htmlFor={id} className={`font-bold text-sm sm:text-base font-[family-name:var(--font-montserrat)] ${disabled ? 'text-[#919090] dark:text-gray-500' : 'text-[#224c87] dark:text-blue-300'}`}>
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type="number"
                    value={value}
                    onChange={(e) => !disabled && onChange(Number(e.target.value))}
                    disabled={disabled}
                    className="w-full p-3 text-base border-2 border-[#919090] dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-gray-100
                     focus:border-[#da3832] focus:ring-1 focus:ring-[#da3832] outline-none
                     transition-all appearance-none font-sans disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    aria-describedby={helperText ? `${id}-helper` : undefined}
                />
                {suffix && (
                    <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#919090] dark:text-gray-400 font-bold text-sm sm:text-base">
                        {suffix}
                    </span>
                )}
            </div>
            {helperText && (
                <p id={`${id}-helper`} className="text-xs sm:text-sm text-[#919090] dark:text-gray-400 italic">
                    {helperText}
                </p>
            )}
        </div>
    );
};
