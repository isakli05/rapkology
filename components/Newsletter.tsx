'use client';

import { useState, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

interface NewsletterProps {
  title: string;
  onSubmit: (email: string) => void;
}

interface NewsletterConfig {
  layout: {
    container: string;
    inputContainer: string;
    spacing: string;
  };
  typography: {
    title: string;
    input: string;
    button: string;
  };
  form: {
    inputPlaceholder: string;
    buttonText: string;
    validation: {
      emailPattern: RegExp;
      minLength: number;
    };
  };
  interactions: {
    input: {
      base: string;
      focus: string;
      error: string;
    };
    button: {
      base: string;
      hover: string;
      disabled: string;
    };
    transition: string;
  };
  accessibility: {
    sectionRole: string;
    sectionLabel: string;
    inputLabel: string;
    buttonLabel: string;
    errorMessage: (error: string) => string;
  };
}

// Design System Configuration - Enterprise Pattern
const newsletterConfig: NewsletterConfig = {
  layout: {
    container: "space-y-6",
    inputContainer: "flex gap-0 border-b border-ink-500",
    spacing: "mb-12"
  },
  typography: {
    title: "font-saira-condensed font-bold text-[40px] leading-[1.04] text-white",
    input: "font-saira font-bold text-sm leading-none text-white placeholder-ink-500",
    button: "font-saira font-bold text-sm leading-none text-right text-brand-yellow"
  },
  form: {
    inputPlaceholder: "EMAIL",
    buttonText: "GÖNDER",
    validation: {
      emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      minLength: 5
    }
  },
  interactions: {
    input: {
      base: "flex-1 bg-transparent py-3 outline-none",
      focus: "focus:ring-0 focus:outline-none",
      error: "border-red-500"
    },
    button: {
      base: "px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-black rounded-sm border border-transparent",
      hover: "hover:border-brand-yellow",
      disabled: "opacity-50 cursor-not-allowed"
    },
    transition: "transition-all duration-200"
  },
  accessibility: {
    sectionRole: "region",
    sectionLabel: "Newsletter aboneliği",
    inputLabel: "Email adresinizi girin",
    buttonLabel: "Newsletter'a abone ol",
    errorMessage: (error: string) => `Hata: ${error}`
  }
};

export default function Newsletter({ title, onSubmit }: NewsletterProps) {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  // Performance: Memoized handlers
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
    
    // Clear success state
    if (success) {
      setSuccess(false);
    }
  }, [error, success]);

  const validateEmail = useCallback((email: string): string | null => {
    if (!email.trim()) {
      return 'Email adresi gereklidir';
    }
    
    if (email.length < newsletterConfig.form.validation.minLength) {
      return 'Email adresi çok kısa';
    }
    
    if (!newsletterConfig.form.validation.emailPattern.test(email)) {
      return 'Geçerli bir email adresi girin';
    }
    
    return null;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await onSubmit(email);
      setSuccess(true);
      setEmail(''); // Clear form on success
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email, validateEmail, onSubmit]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  }, [handleSubmit]);

  return (
    <section 
      className={newsletterConfig.layout.container}
      role={newsletterConfig.accessibility.sectionRole}
      aria-label={newsletterConfig.accessibility.sectionLabel}
    >
      
      {/* Section Title - Design System Typography */}
      <h2 className={`${newsletterConfig.typography.title} ${newsletterConfig.layout.spacing}`}>
        {title}
      </h2>

      {/* Newsletter Form */}
      <form onSubmit={handleSubmit} noValidate>
        
        {/* Email Input Container - Design System Component */}
        <div className={`
          ${newsletterConfig.layout.inputContainer}
          ${error ? 'border-red-500' : 'border-ink-500 hover:border-brand-yellow focus-within:border-brand-yellow'}
          ${newsletterConfig.interactions.transition}
        `}>
          
          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
            placeholder={newsletterConfig.form.inputPlaceholder}
            disabled={isSubmitting}
            aria-label={newsletterConfig.accessibility.inputLabel}
            aria-invalid={!!error}
            aria-describedby={error ? 'newsletter-error' : undefined}
            autoComplete="email"
            suppressHydrationWarning={true}
            className={`
              ${newsletterConfig.typography.input}
              ${newsletterConfig.interactions.input.base}
              ${newsletterConfig.interactions.input.focus}
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            aria-label={newsletterConfig.accessibility.buttonLabel}
            className={`
              ${newsletterConfig.typography.button}
              ${newsletterConfig.interactions.button.base}
              ${newsletterConfig.interactions.button.hover}
              ${newsletterConfig.interactions.transition}
              ${(isSubmitting || !email.trim()) ? newsletterConfig.interactions.button.disabled : ''}
              flex items-center gap-2
            `}
          >
            {isSubmitting ? 'GÖNDERİLİYOR...' : newsletterConfig.form.buttonText}
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </button>

        </div>

        {/* Error Message */}
        {error && (
          <p 
            id="newsletter-error"
            role="alert"
            className="mt-2 font-saira font-normal text-sm text-red-400"
            aria-live="polite"
          >
            {newsletterConfig.accessibility.errorMessage(error)}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p 
            role="status"
            className="mt-2 font-saira font-normal text-sm text-brand-yellow"
            aria-live="polite"
          >
            ✓ Başarıyla abone oldunuz!
          </p>
        )}

      </form>

    </section>
  );
}
