# 🎵 Rapkology - Frontend Case Study

## 🚀 Tech Stack

- **Next.js 15.1.8** - App Router, Server Components
- **React 19.1.1** - Latest features  
- **TypeScript 5.9.2** - Type safety
- **Tailwind CSS 3.4.16** - Utility-first styling
- **next/font** - Google Fonts optimization

## 📝 Font Optimization Yaklaşımı

### Problem
Figma tasarımında Saira ve Saira Condensed fontları kullanılıyor. Geleneksel `@import` veya `<link>` yöntemleri performans sorunlarına yol açar.

### Çözüm: next/font ile Professional Implementation

**1. Font Definitions (`app/fonts.ts`)**
```typescript
// Google Fonts'u optimize şekilde import ediyoruz
export const saira = Saira({
  subsets: ['latin', 'latin-ext'],  // Sadece gerekli character sets
  display: 'swap',                  // FOUT prevention
  variable: '--font-saira',         // CSS custom property
  weight: ['300', '400', '700'],    // Sadece kullanılan weights
});
```

**2. System Integration (`app/layout.tsx`)**
```typescript
// Font variable'larını HTML root'a ekliyoruz
<html className={`${saira.variable} ${sairaCondensed.variable}`}>
```

**3. Tailwind Aliases (`tailwind.config.ts`)**
```typescript
// Developer-friendly class names oluşturuyoruz
fontFamily: {
  'saira': ['var(--font-saira)'],
  'saira-condensed': ['var(--font-saira-condensed)'],
}
```

### Teknik Avantajlar

✅ **Performance**: Font'lar build time'da optimize ediliyor  
✅ **FOUT Prevention**: `display: 'swap'` ile layout shift engelleniyor  
✅ **Bundle Optimization**: Sadece kullanılan karakterler download ediliyor  
✅ **Developer Experience**: `font-saira` gibi semantic class names  
✅ **Type Safety**: TypeScript ile font imports validate ediliyor  

### Usage Example
```jsx
// Figma'dan gelen tipografi kuralları artık bu şekilde:
<h1 className="font-saira-condensed font-bold text-[60px] leading-[0.89]">
  Modern Başlık
</h1>
```

Bu yaklaşım sayesinde Google Fonts'u Next.js best practices'e uygun şekilde kullanarak hem performanslı hem de maintainable bir font sistemi kurguladım.

---

