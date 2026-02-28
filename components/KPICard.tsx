import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export function KPICard({ title, value, icon: Icon, trend, variant = 'default' }: KPICardProps) {
  const variantStyles = {
    default: 'bg-neutral-50 border-neutral-200',
    primary: 'bg-primary-50 border-primary-200',
    success: 'bg-success-50 border-success-200',
    warning: 'bg-warning-50 border-warning-200',
    danger: 'bg-danger-50 border-danger-200',
  };

  const iconVariantStyles = {
    default: 'bg-neutral-100 text-neutral-600',
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
    danger: 'bg-danger-100 text-danger-600',
  };

  return (
    <div className={`p-6 bg-white border rounded-xl ${variantStyles[variant]} transition-shadow hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-neutral-600 caption mb-2">{title}</p>
          <h3 className="mb-2">{value}</h3>
          {trend && (
            <span className={`caption ${trend.isPositive ? 'text-success-600' : 'text-danger-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconVariantStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
