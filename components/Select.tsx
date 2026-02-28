import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-neutral-700">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2.5 min-h-[44px] bg-white border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? 'border-danger-500' : 'border-neutral-300 hover:border-neutral-400'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-danger-600 caption">{error}</p>}
    </div>
  );
}
