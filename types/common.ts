// Shared types across components - Design System Level
// Bu dosya tüm bileşenler arasında tutarlı type kullanımını sağlar

// View Mode Types - Cards/Content Display
export type ViewMode = 'list' | 'grid' | 'single' | 'double';

// Size Types - Components
export type ComponentSize = 'sm' | 'md' | 'lg';

// Variant Types - Components  
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

// Priority Types - Images
export type Priority = boolean;

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Common Props Interfaces
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IdentifiableItem {
  id: string;
}

export interface ConfigurableComponent {
  variant?: ComponentVariant;
  size?: ComponentSize;
}

// Author Interface - Reusable across components
export interface Author {
  name: string;
  avatar: string;
}

// Blog/News Post Base Interface
export interface BasePost extends IdentifiableItem {
  title: string;
  slug: string;
  author: Author;
  publishDate: string;
}

// Accessibility Interface
export interface AccessibilityConfig {
  sectionRole: string;
  sectionLabel: string;
}
