import type { UiElementSpec } from './types';

export const navbar: UiElementSpec = {
  id: 'navbar',
  name: 'Navbar',
  htmlTag: '<nav>',
  variant: 'Sticky · Glassmorphism',
  summary:
    'Sitenin ana bölümlerine giden linkleri ve öne çıkan eylemi taşıyan üst şerit. Bu örnek kaydırırken üstte kalıyor, arkasındaki içeriği de buzlu cam gibi bulanıklaştırıyor.',
  aliases: ['üst menü', 'sabit üst bar', 'arkası bulanık menü'],
  concepts: [
    {
      kind: 'appearance',
      term: 'backdrop-filter',
      value: 'blur(16px)',
      plain:
        'Arkada kalan içeriği bulanıklaştırır. Yarı saydam zeminle birleşince “buzlu cam” (glassmorphism) etkisi verir.',
    },
    {
      kind: 'appearance',
      term: 'linear-gradient',
      value: '(135deg, #6366f1, #ec4899)',
      plain:
        'Renklerin bir çizgi boyunca yumuşakça birbirine geçmesi. Logodaki ve “Ücretsiz dene” butonundaki geçiş bu.',
    },
    {
      kind: 'behavior',
      term: 'position: sticky',
      value: 'top: 0',
      plain: 'Sayfa kaydırılırken öğe belirlenen noktaya yapışır; navbar hep ekranın üstünde kalır.',
    },
    {
      kind: 'behavior',
      term: 'Breakpoint',
      value: '@container (width < 640px)',
      plain:
        'Yerleşimin değiştiği genişlik eşiği (media / container query). Dar ekranda linkler ☰ hamburger menüye geçer.',
    },
  ],
};
