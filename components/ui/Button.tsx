'use client';

import React from 'react';

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'banner-primary' | 'banner-secondary' | 'banner-dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

// Utility function to combine classes (simple replacement for clsx/cn)
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Button variant configurations - Based on existing design system
const getButtonClasses = (variant: ButtonVariant, size: ButtonSize): string => {
  // Base classes for all buttons
  const baseClasses = "inline-flex items-center justify-center font-saira font-bold leading-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer border-none";
  
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 min-w-24 min-h-10 text-sm",
    md: "px-6 py-3 min-w-32 min-h-12 text-sm", 
    lg: "px-8 py-4 min-w-36 min-h-14 text-sm lg:text-base"
  };

  // Variant classes
  const variantClasses = {
    // CTA Button - Yellow with clip-path (from globals.css .cta-button)
    primary: "cta-button", // Direct use of CSS class with all styling
    
    // Secondary Button - White background 
    secondary: cn(
      "text-black bg-white hover:bg-brand-yellow hover:text-black",
      "focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black"
    ),
    
    // Outline Button - Border only
    outline: cn(
      "border-2 border-white text-white hover:bg-white hover:text-black",
      "focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
    ),
    
    // Ghost Button - Text only
    ghost: cn(
      "text-white hover:text-brand-yellow bg-transparent",
      "focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black"
    ),
    
    // Banner Primary Button - Twitch Purple (from globals.css .banner-button-primary)
    'banner-primary': cn(
      "banner-button banner-button-primary gap-1 lg:gap-2 rounded-lg",
      "text-white border-purple-600 bg-purple-600 hover:bg-purple-700 hover:border-purple-700",
      "focus:ring-purple-500 focus:ring-offset-2"
    ),
    
    // Banner Secondary Button - Purple outline (from globals.css .banner-button-secondary)
    'banner-secondary': cn(
      "banner-button banner-button-secondary gap-1 lg:gap-2 rounded-lg",
      "text-purple-600 border-purple-600 bg-transparent hover:bg-purple-600 hover:text-white",
      "focus:ring-purple-500 focus:ring-offset-2"
    ),
    
    // Banner Dark Button - Dark theme (from globals.css .banner-button-dark)
    'banner-dark': cn(
      "banner-button banner-button-dark gap-1 lg:gap-2 rounded-lg", 
      "text-white border-ink-700 bg-ink-700 hover:bg-ink-500 hover:border-ink-500",
      "focus:ring-ink-700 focus:ring-offset-2"
    ),
  };

  // Special handling for CTA button (primary) - uses its own complete styling
  if (variant === 'primary') {
    return variantClasses[variant];
  }
  
  return cn(baseClasses, sizeClasses[size], variantClasses[variant]);
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const buttonClasses = cn(getButtonClasses(variant, size), className);
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

// Additional export for shadow element (for primary variant)
export const ButtonShadow: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("cta-button-shadow", className)} aria-hidden="true" />
);
