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
        <div className={`flex flex-col space-y-4 w-full py-4 ${disabled ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-center">
                <label htmlFor={id} className={`font-bold font-[family-name:var(--font-montserrat)] ${disabled ? 'text-[#919090]' : 'text-[#224c87]'}`}>
                    {label}
                </label>
                <span className={`text-lg font-bold border-b-2 ${disabled ? 'text-[#919090] border-[#919090]/30' : 'text-[#224c87] border-[#919090]'}`}>
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
                className="w-full h-2 bg-[#919090] rounded-lg appearance-none cursor-pointer 
                   accent-[#224c87] focus:outline-none focus:ring-2 focus:ring-[#da3832] focus:ring-offset-2 disabled:cursor-not-allowed"
            />
            <div className="flex justify-between text-xs text-[#919090] font-bold">
                <span>{min} {unit}</span>
                <span>{max} {unit}</span>
            </div>
        </div>
    );
};