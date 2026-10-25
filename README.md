# Project Wingman

Ürün yöneticileri ve kuruculara UI/UX terimlerini öğreten; “arkası bulanık üst menü” gibi gündelik tasvirleri
Claude Code veya Cursor gibi araçların anlayacağı net tasarım direktiflerine dönüştürmeyi hedefleyen ürün.

## Şu anki durum: açılış sayfası

İngilizce açılış sayfası; yapışkan üst menü (tema düğmesiyle), kapak, örnekler, değer kartları, planlar ve
footer'dan oluşur. Örnekler bölümünde beş proje (pazarlama sitesi, analiz paneli, üç mobil uygulama) vardır ve
neredeyse her öğe üzerine gelince adını, kısa bir duraksamada özetini, tıklayınca tam açıklamasını gösterir.

Kapsam dışı (sonraki aşamalar): kimlik doğrulama ve giriş sonrası alanlar (“Sign in” şimdilik yer tutucu),
ödeme/abonelik (planlardaki fiyatlar yer tutucu), gerçek LLM entegrasyonu.

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
UI kütüphanesi ya da Tailwind yok: örneklerde kullanılan CSS değerleri, balonda anlatılan kavramlarla birebir aynı.
Fontlar (Roboto, Roboto Mono; LayerZero ile aynı) Fontsource ile kendi sunucumuzdan yüklenir; tema sistem ayarına
göre açık ya da koyu olur. Görsel kararların tamamı [DESIGN.md](DESIGN.md) içinde.

## Klasör yapısı

```
src/
  landing/     Açılış sayfası bölümleri: üst menü, tema düğmesi, kapak, örnekler, değer kartları, planlar, footer
  demos/       İncelenen örnek projeler: AcmeSite, OrbitDashboard, WaveApp, MuseApp, StrideApp (+ ortak StatusBar)
  catalog/     Öğe açıklamaları (İngilizce, tipli veri): marketing, dashboard, mobile, assistant, commerce
  inspector/   “Öğeyi incele” katmanı: InspectSurface, açıklama balonu, konumlandırma
  showcase/    Çerçeveler ve etkileşim rehberi: kaydırma sahnesi olarak tarayıcı (useScrollScene), ölçeklenen telefon
  brand/       Logo ve kapaktaki hareketli çizgiler (kayan yıldızla birlikte)
  styles/      Tasarım token'ları (light-dark) ve global stiller
  theme.ts     Açık/koyu tema: okuma, seçme, değişimi dinleme
```

## Yeni bir UI öğesi eklemek

1. Açıklamayı yaz: ilgili katalog dosyasına (`src/catalog/marketing.ts`, `dashboard.ts`, `mobile.ts`, `assistant.ts`
   ya da `commerce.ts`) bir
   `UiElementSpec` ekle; `value` alanlarına demodaki gerçek CSS değerlerini yaz.
2. Demoda işaretle: öğeye `data-inspect="<id>"` niteliğini ekle.

Hover, tıklama, dokunma, klavye, anahat, balon ve sayaç kendiliğinden çalışır. Katalogda karşılığı olmayan bir
kimlik, geliştirme sırasında konsola uyarı düşer.

## Yeni bir örnek proje eklemek

1. `src/demos/` altına bileşeni yaz. Gerçek link ve düğme kullanma (href'siz `<a>`, `<span>`), renkleri sabit tut.
2. `src/landing/Examples.tsx` içinde `BrowserFrame` ya da `PhoneFrame` ile sar ve `InspectSurface` içine koy
   (telefon için `fill`). `BrowserFrame` bir kaydırma sahnesidir: pencere sabitlenir, sayfa kaydırması içeriği
   kaydırır. Telefonlar tek sırada durur ve sığmazlarsa birlikte küçülür.
3. Demo kendi kendine hareket ediyorsa (açılıp kapanan menü ya da gelip giden toast gibi) `useInspectActivity()` ile
   incelenirken durdur.

## Etkileşim modeli

| Girdi | Önizleme (özet) | Sabit (tam açıklama) | Kapanır |
| --- | --- | --- | --- |
| Fare | Üzerine gel, 280 ms bekle | Tıkla | Dışarı tıkla, aynı öğeye tekrar tıkla, Esc |
| Dokunmatik | — | Dokun | Dışarı dokun (kaydırmak kapatmaz) |
| Klavye | Örneğe Tab ile gir, oklarla gez | Enter | Esc, Tab ile çık |
