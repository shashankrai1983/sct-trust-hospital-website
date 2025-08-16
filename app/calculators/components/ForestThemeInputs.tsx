'use client';

// Forest Theme Input Components
// Styled input components with forest green + cream theme and animations

import React, { useRef, useEffect, forwardRef } from 'react';
import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets } from './animations/ForestAnimations';

interface BaseInputProps {
  label: string;
  error?: string;
  success?: string;
  className?: string;
  required?: boolean;
  helpText?: string;
}

interface ForestDatePickerProps extends BaseInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  min?: string;
  max?: string;
  placeholder?: string;
}

interface ForestNumberInputProps extends BaseInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

interface ForestSelectProps extends BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

// Date Picker Component
export const ForestDatePicker = forwardRef<HTMLInputElement, ForestDatePickerProps>(
  ({ label, value, onChange, error, success, className = '', required, helpText, min, max, placeholder, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        const input = inputRef.current;
        
        const handleFocus = () => {
          if (containerRef.current) {
            presets.inputFocus(containerRef.current);
          }
        };

        input.addEventListener('focus', handleFocus);
        return () => input.removeEventListener('focus', handleFocus);
      }
    }, []);

    useEffect(() => {
      if (error && containerRef.current) {
        presets.error(containerRef.current);
      } else if (success && containerRef.current) {
        presets.success(containerRef.current);
      }
    }, [error, success]);

    return (
      <div className={`space-y-2 ${className}`}>
        <label className={calculatorTheme.classes.label}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <div ref={containerRef} className="relative">
          <div className="relative">
            <input
              ref={ref || inputRef}
              type="date"
              value={value ? format(value, 'yyyy-MM-dd') : ''}
              onChange={(e) => {
                const newDate = e.target.value ? new Date(e.target.value) : null;
                onChange(newDate);
              }}
              min={min}
              max={max}
              placeholder={placeholder}
              className={`
                ${calculatorTheme.classes.input}
                ${error ? 'border-red-500 focus:border-red-500' : ''}
                ${success ? 'border-forest-green focus:border-forest-green' : ''}
                pl-10 w-full
              `}
              {...props}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-green/60" />
          </div>
          
          {/* Status icons */}
          {error && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
          {success && !error && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-green" />
          )}
        </div>
        
        {/* Help text */}
        {helpText && !error && !success && (
          <p className="text-xs text-text-brown/60">{helpText}</p>
        )}
        
        {/* Error message */}
        {error && (
          <p className={calculatorTheme.classes.error}>
            {error}
          </p>
        )}
        
        {/* Success message */}
        {success && !error && (
          <p className={calculatorTheme.classes.success}>
            {success}
          </p>
        )}
      </div>
    );
  }
);

ForestDatePicker.displayName = 'ForestDatePicker';

// Number Input Component
export const ForestNumberInput = forwardRef<HTMLInputElement, ForestNumberInputProps>(
  ({ label, value, onChange, error, success, className = '', required, helpText, min, max, step = 1, unit, placeholder, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        const input = inputRef.current;
        
        const handleFocus = () => {
          if (containerRef.current) {
            presets.inputFocus(containerRef.current);
          }
        };

        input.addEventListener('focus', handleFocus);
        return () => input.removeEventListener('focus', handleFocus);
      }
    }, []);

    useEffect(() => {
      if (error && containerRef.current) {
        presets.error(containerRef.current);
      } else if (success && containerRef.current) {
        presets.success(containerRef.current);
      }
    }, [error, success]);

    return (
      <div className={`space-y-2 ${className}`}>
        <label className={calculatorTheme.classes.label}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <div ref={containerRef} className="relative">
          <input
            ref={ref || inputRef}
            type="number"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value === '' ? '' : parseFloat(e.target.value);
              onChange(newValue);
            }}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            className={`
              ${calculatorTheme.classes.input}
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${success ? 'border-forest-green focus:border-forest-green' : ''}
              ${unit ? 'pr-12' : 'pr-10'} w-full
            `}
            {...props}
          />
          
          {/* Unit display */}
          {unit && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-text-brown/60">
              {unit}
            </span>
          )}
          
          {/* Status icons */}
          {error && (
            <AlertCircle className={`absolute ${unit ? 'right-16' : 'right-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500`} />
          )}
          {success && !error && (
            <CheckCircle2 className={`absolute ${unit ? 'right-16' : 'right-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-green`} />
          )}
        </div>
        
        {/* Help text */}
        {helpText && !error && !success && (
          <p className="text-xs text-text-brown/60">{helpText}</p>
        )}
        
        {/* Error message */}
        {error && (
          <p className={calculatorTheme.classes.error}>
            {error}
          </p>
        )}
        
        {/* Success message */}
        {success && !error && (
          <p className={calculatorTheme.classes.success}>
            {success}
          </p>
        )}
      </div>
    );
  }
);

ForestNumberInput.displayName = 'ForestNumberInput';

// Select Component
export const ForestSelect = forwardRef<HTMLSelectElement, ForestSelectProps>(
  ({ label, value, onChange, options, error, success, className = '', required, helpText, placeholder, ...props }, ref) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (selectRef.current) {
        const select = selectRef.current;
        
        const handleFocus = () => {
          if (containerRef.current) {
            presets.inputFocus(containerRef.current);
          }
        };

        select.addEventListener('focus', handleFocus);
        return () => select.removeEventListener('focus', handleFocus);
      }
    }, []);

    useEffect(() => {
      if (error && containerRef.current) {
        presets.error(containerRef.current);
      } else if (success && containerRef.current) {
        presets.success(containerRef.current);
      }
    }, [error, success]);

    return (
      <div className={`space-y-2 ${className}`}>
        <label className={calculatorTheme.classes.label}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        <div ref={containerRef} className="relative">
          <select
            ref={ref || selectRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`
              ${calculatorTheme.classes.input}
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${success ? 'border-forest-green focus:border-forest-green' : ''}
              w-full appearance-none bg-no-repeat bg-right
              bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")]
              pr-10
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Status icons */}
          {error && (
            <AlertCircle className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
          )}
          {success && !error && (
            <CheckCircle2 className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-forest-green" />
          )}
        </div>
        
        {/* Help text */}
        {helpText && !error && !success && (
          <p className="text-xs text-text-brown/60">{helpText}</p>
        )}
        
        {/* Error message */}
        {error && (
          <p className={calculatorTheme.classes.error}>
            {error}
          </p>
        )}
        
        {/* Success message */}
        {success && !error && (
          <p className={calculatorTheme.classes.success}>
            {success}
          </p>
        )}
      </div>
    );
  }
);

ForestSelect.displayName = 'ForestSelect';

// Button Component
interface ForestButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const ForestButton: React.FC<ForestButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (buttonRef.current && !disabled && !loading) {
      presets.buttonPress(buttonRef.current);
      if (onClick) {
        setTimeout(onClick, 150); // Slight delay for animation
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-forest-green text-white hover:bg-primary-green border-forest-green';
      case 'outline':
        return 'bg-transparent text-primary-green border-2 border-primary-green hover:bg-primary-green hover:text-white';
      default:
        return calculatorTheme.classes.button;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        font-medium rounded-lg transition-all duration-300 relative overflow-hidden
        focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:ring-offset-2
        ${className}
      `}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

// Form Group Component for consistent spacing
export const ForestFormGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`space-y-6 ${className}`}>
    {children}
  </div>
);

export default {
  ForestDatePicker,
  ForestNumberInput,
  ForestSelect,
  ForestButton,
  ForestFormGroup,
};