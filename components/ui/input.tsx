import * as React from "react";

import { cn } from "./utils";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  helperText?: string;
};

function Input({ className, type, label, error, helperText, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        error && "border-danger-500",
        className,
      )}
      {...props}
    />
  );

  if (!label && !error && !helperText) {
    return input;
  }

  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm text-neutral-700">{label}</label>}
      {input}
      {error && <p className="text-danger-600 text-sm">{error}</p>}
      {helperText && !error && <p className="text-neutral-500 text-sm">{helperText}</p>}
    </div>
  );
}

export { Input };
