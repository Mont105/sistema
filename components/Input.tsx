import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-neutral-700">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 min-h-[44px] bg-white border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? 'border-danger-500' : 'border-neutral-300 hover:border-neutral-400'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-danger-600 caption">{error}</p>}
      {helperText && !error && <p className="mt-1 text-neutral-500 caption">{helperText}</p>}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function TextArea({ label, error, helperText, className = '', ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-neutral-700">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2.5 bg-white border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed resize-y min-h-[100px] ${
          error ? 'border-danger-500' : 'border-neutral-300 hover:border-neutral-400'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-danger-600 caption">{error}</p>}
      {helperText && !error && <p className="mt-1 text-neutral-500 caption">{helperText}</p>}
    </div>
  );
}
