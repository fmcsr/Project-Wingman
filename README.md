# PM Wingman

Ürün yöneticileri ve kuruculara UI/UX terimlerini öğreten; “arkası bulanık üst menü” gibi gündelik tasvirleri
Claude Code veya Cursor gibi araçların anlayacağı net tasarım direktiflerine dönüştürmeyi hedefleyen ürün.

## Aşama 1 — İnteraktif UI vitrini

Örnek bir sayfadaki navbar'ın üzerine gelince, tıklayınca, dokununca ya da klavyeyle odaklanınca bir açıklama
balonu açılır. Balon teknik adı, kısa açıklamayı ve arkasındaki CSS kavramlarını (`backdrop-filter`,
`linear-gradient`, `position: sticky`, breakpoint) sade dille gösterir.

Kapsam dışı (sonraki aşamalar): kimlik doğrulama, ödeme/abonelik, gerçek LLM entegrasyonu.

## Çalıştırma

Gereksinim: Node.js 20.19+ veya 22.12+

```bash
npm install
npm run dev
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu, varsayılan olarak http://localhost:5173 |
| `npm run build` | Tip kontrolü + üretim derlemesi (`dist/`) |
| `npm run preview` | Derlenmiş sürümü yerelde sunar |
| `npm run typecheck` | Yalnızca TypeScript kontrolü |

## Yığın

Vite + React 19 + TypeScript; stil için CSS Modules ve CSS değişkenleri (`src/styles/tokens.css`).
UI kütüphanesi ya da Tailwind yok: örnekte kullanılan CSS değerleri balonda anlatılan kavramlarla birebir aynı
ve kodda düz okunuyor.

## Klasör yapısı

```
src/
  catalog/     UI öğelerinin açıklama içerikleri (tipli veri)
  demos/       Açıklanan örnek bileşenler (NavbarDemo)
  inspector/   Hedef + açıklama balonu etkileşimi (yeniden kullanılabilir)
  showcase/    Sahne: sahte tarayıcı çerçevesi, örnek sayfa, etkileşim rehberi
  styles/      Tasarım token'ları ve global stiller
```

## Yeni bir UI öğesi eklemek

1. İçeriği yaz: `src/catalog/card.ts` (`UiElementSpec` tipinde) ve `src/catalog/index.ts` içine kaydet.
2. Örneği çiz: `src/demos/CardDemo.tsx`. Bileşen yalnızca görünümden sorumludur.
3. Sahnede sar: `<Inspectable spec={catalog.card}><CardDemo /></Inspectable>`.

Hover, tıklama, dokunma, klavye, konumlandırma ve erişilebilirlik `Inspectable` tarafından sağlanır.

## Etkileşim modeli

| Durum | Açılır | Kapanır |
| --- | --- | --- |
| Önizleme | Fareyle üzerine gelme, klavyeyle odaklanma (Tab) | İmleç ayrılınca, odak başka yere geçince, Esc |
| Sabit | Tıklama, dokunma, Enter/Space, önizlemedeki balona tıklama | Tekrar tıklama, dışarı tıklama/dokunma, Esc, × |

- Dokunmatikte tarayıcının ürettiği sahte hover yok sayılır; dışarıda kaydırmak balonu kapatmaz, dokunmak kapatır.
- İmleç hedeften balona geçerken balon açık kalır (WCAG 1.4.13). Esc ile kapatınca odak hedefe geri döner.
- Balon, çerçevenin kırpmasına takılmasın diye ayrı bir katmana çizilir; dar ekranda genişliğe sığar ve
  kavramlar tek sütuna iner.
