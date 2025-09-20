// Standardized Configuration Interfaces for Components
// Bu dosya tüm bileşenler arasında tutarlı config pattern'i sağlar

import type { AccessibilityConfig } from './common';

// Base Configuration Interface - All components should extend this
export interface BaseComponentConfig {
  layout: {
    container: string;
    spacing?: string;
  };
  typography: Record<string, string | undefined>;
  accessibility: AccessibilityConfig;
}

// Layout Configuration
export interface LayoutConfig {
  container: string;
  grid?: string;
  spacing: string;
  responsive?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

// Typography Configuration
export interface TypographyConfig {
  title: string;
  subtitle?: string;
  content?: string;
  link?: string;
  label?: string;
  [key: string]: string | undefined;
}

// Interaction Configuration
export interface InteractionConfig {
  hover?: string;
  active?: string;
  focus?: string;
  transition: string;
  disabled?: string;
}

// Complete Component Configuration
export interface ComponentConfig extends BaseComponentConfig {
  layout: LayoutConfig;
  typography: TypographyConfig;
  interactions?: InteractionConfig;
  variants?: Record<string, string>;
}

// Card Component Specific Configuration
export interface CardConfig extends ComponentConfig {
  card: {
    base: string;
    hover: string;
    image: string;
    content: string;
  };
}

// Form Component Specific Configuration  
export interface FormConfig extends ComponentConfig {
  form: {
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
    validation: {
      required?: string;
      invalid?: string;
    };
  };
}

// Navigation Component Specific Configuration
export interface NavigationConfig extends ComponentConfig {
  navigation: {
    link: {
      base: string;
      active: string;
      hover: string;
    };
    menu: {
      base: string;
      mobile?: string;
      desktop?: string;
    };
  };
}

// Slider Component Specific Configuration
export interface SliderConfig extends ComponentConfig {
  slider: {
    container: string;
    slide: string;
    navigation?: {
      prev: string;
      next: string;
    };
    pagination?: {
      container: string;
      bullet: string;
      active: string;
    };
  };
}

// Content Section Configuration
export interface SectionConfig extends ComponentConfig {
  section: {
    header?: string;
    content: string;
    footer?: string;
  };
}

// Configuration Factory Functions
export const createLayoutConfig = (
  container: string, 
  spacing: string, 
  responsive?: LayoutConfig['responsive']
): LayoutConfig => ({
  container,
  spacing,
  responsive
});

export const createTypographyConfig = (
  baseConfig: Record<string, string>
): TypographyConfig => ({
  title: 'font-saira-condensed font-bold text-white',
  content: 'font-saira font-normal text-white',
  ...baseConfig
});

export const createInteractionConfig = (
  transition = 'transition-all duration-200',
  overrides: Partial<InteractionConfig> = {}
): InteractionConfig => ({
  transition,
  hover: 'hover:text-brand-yellow',
  focus: 'focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2',
  ...overrides
});

// Validation Helper
export const validateConfig = (config: ComponentConfig): boolean => {
  return !!(
    config.layout?.container &&
    config.typography?.title &&
    config.accessibility?.sectionRole &&
    config.accessibility?.sectionLabel
  );
};
