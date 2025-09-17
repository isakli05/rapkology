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

## 🖼️ Image Optimization Stratejisi

### Next.js Image Component Kullanımı
Slider'da görseller için `next/image` component'ini tercih ettim çünkü normal `<img>` tag'ine göre büyük avantajları var. Otomatik olarak görselleri optimize ediyor, lazy loading yapıyor ve WebP gibi modern formatlara çeviriyor. Bu sayede sayfa yüklenme hızı ciddi şekilde artıyor.

### Fill Attribute Mantığı
Hero slider'da görsellerin container'ı tam kaplamasını istiyoruz. `fill` attribute'u görselin parent container'ını tamamen doldurmasını sağlıyor. Bu responsive tasarım için kritik çünkü farklı ekran boyutlarında görsel her zaman tam kapıyor.

### Priority Loading Stratejisi
İlk slide'da `priority={slide.id === 1}` kullanarak sadece ilk görselin prioriteli yüklenmesini sağladık. Bu şekilde kullanıcı sayfayı açtığında en önemli görsel hemen yüklenirken diğerleri arka planda lazy loading ile geliyor.

## 📐 Content Grid Sistemi

### Semantic Layout Yaklaşımı
Hero slider'da CSS Grid ile 12 kolonluk semantik layout sistemi kurduk. Bu yaklaşım responsive tasarım için çok güçlü çünkü farklı ekran boyutlarında content'in hangi alanda durması gerektiğini net şekilde kontrol edebiliyoruz.

### Responsive Content Positioning
Grid sistem sayesinde mobilde content tam genişlik kaplarken, desktop'ta rapçi görselinin yanında belirli kolonlarda duruyor. Bu yaklaşım hem tasarım tutarlılığı hem de kod maintainability açısından çok etkili.

## 🎯 Banner Component - Technical Case Study

### Gerçek Dünya Problemi
Banner bileşeninde Figma tasarımından responsive koda geçerken ilginç bir teknik zorlukla karşılaştım. Rapçi görsellerini yüzdelik değerlerle (`left: 60%`, `right: 50%`) konumlandırmak istedim ama Tailwind'in `theme()` fonksiyonu bu tür positioning değerlerini desteklemiyor.

### Ne Denedim?
İlk etapta CSS custom properties ile çözmeye çalıştım ama browser'da positioning conflict'leri yaşadım. Ardından Tailwind'in arbitrary values (`left-[60%]`) yaklaşımına baktım ama bu design system mantığına aykırıydı.

### Pragmatik Çözüm
Sonunda hibrit bir yaklaşım seçtim: TypeScript config ile centralized configuration + inline styles. Bu yaklaşım şu avantajları sağladı:

**✅ Type Safety**: Banner'daki tüm değerler TypeScript interface ile korumalı  
**✅ Maintainable**: Tüm positioning değerleri tek yerde, merkezi config'te  
**✅ Performance**: Runtime CSS calculation yok, pure inline styles  
**✅ Responsive**: Her değer responsive breakpoint'leri destekliyor  

### Implementation Özeti
Banner'ı şu şekilde architekt ettik:
- **Config-Driven**: Tüm içerik, asset path'leri ve layout değerleri centralized configuration'da
- **Hybrid Styling**: Tailwind classes + TypeScript-driven positioning  
- **Layered Design**: Z-index hierarchy ile cloud, crowd, content ve mask layer'ları
- **Performance Focus**: `priority` loading, `useCallback` handlers

### Teknik Kararın Gerekçesi
"Mükemmel Tailwind çözümü" yerine "çalışan, maintainable çözümü" tercih ettim. Bazen en iyi engineering decision, mevcut tool'un limitasyonlarını kabul edip pragmatik hybrid approach seçmektir. Bu yaklaşım future-proof çünkü gerekirse config'i kolayca CSS-in-JS'e migrate edebiliriz.
---

