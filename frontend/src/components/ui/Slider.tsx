import React from 'react';

interface SliderProps {
    id: string;
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    unit: string;
    disabled?: boolean;
}

export const Slider = ({ id, label, min, max, value, onChange, unit, disabled }: SliderProps) => {
    return (
        <div className={`flex flex-col space-y-3 sm:space-y-4 w-full py-3 sm:py-4 ${disabled ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-center gap-2">
                <label htmlFor={id} className={`font-bold text-sm sm:text-base font-[family-name:var(--font-montserrat)] ${disabled ? 'text-[#919090] dark:text-gray-500' : 'text-[#224c87] dark:text-blue-300'}`}>
                    {label}
                </label>
                <span className={`text-base sm:text-lg font-bold border-b-2 shrink-0 ${disabled ? 'text-[#919090] dark:text-gray-500 border-[#919090]/30 dark:border-gray-600' : 'text-[#224c87] dark:text-blue-300 border-[#919090] dark:border-gray-500'}`}>
                    {value} {unit}
                </span>
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => !disabled && onChange(Number(e.target.value))}
                disabled={disabled}
                className="w-full h-2 bg-[#919090] dark:bg-gray-600 rounded-lg appearance-none cursor-pointer
                   accent-[#224c87] focus:outline-none focus:ring-2 focus:ring-[#da3832] focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed
                   touch-manipulation"
            />
            <div className="flex justify-between text-[10px] sm:text-xs text-[#919090] dark:text-gray-500 font-bold">
                <span>{min} {unit}</span>
                <span>{max} {unit}</span>
            </div>
        </div>
    );
};
