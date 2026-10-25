# Project Wingman — Tasarım kararları

Son güncelleme: 2026-10-25 · Durum: Açılış sayfasına uygulandı

## Kararlar

| Konu | Karar | Neden |
| --- | --- | --- |
| Ürün adı | Project Wingman | Arayüz, repo ve belgelerde tek ad. |
| Site dili | İngilizce | Ücretli ürün ve uluslararası hedef kitle. Geliştirici belgeleri (bu dosya, README, kod yorumları) Türkçe kalır. |
| Tema | Açık ve koyu. Varsayılan sistem ayarı; üst menüdeki düğmeyle seçilir ve hatırlanır | Token'lar `light-dark()` ile bir kez tanımlanır; düğme `<html data-theme>` ile `color-scheme`'i ezer. Seçim `localStorage`'da tutulur, `index.html`'deki küçük betik ilk boyamadan önce uygular. |
| Görsel yön | **Sinyal**: açık temada LayerZero'nun gri sadeliği, koyu temada Stargate'in derinliği | İki referansın ortak dili (nötr taban, tek vurgu, düz yüzeyler) açık/koyu ikiliğine oturuyor. |
| Vurgu rengi | Tek renk, sinyal yeşili; **yalnızca öğrenme anlarında** | İnceleme anahattı, ad etiketi, terim etiketleri, odak halkası. Başka yerde kullanılmaz. |
| Tipografi | Roboto + Roboto Mono, LayerZero ile birebir | LayerZero'nun kullandığı yazı tipleri; ikisi de açık lisanslı (OFL). Fontsource ile kendi sunucumuzdan yüklenir. Başlık ve etiket ölçüleri de LayerZero'dan alındı. |
| İmza görseli | Hero'da simetrik ışınlar (`src/brand/HorizonLines.tsx`): soldan gelir, ortada küçülür, sağa doğru aynı biçimde büyür. Arada bir kayan yıldız geçer: 2–5 ışık soldan farklı ışınlardan gelip odakta buluşur, birleşen ışık sağda başka bir ışından çıkar | LayerZero'nun kapak ekranından esinlenen motif; metaforu “dağınık fikirler tek net terimde buluşur ve oradan yeniden açılır”. Kayan yıldız bu buluşmayı canlandırır. Akış soldan sağadır. |
| Örnek arayüzler | Site temasından etkilenmez; her biri kendi görünümünü korur (Muse bilerek koyu) | Örnekler gerçek ürünleri temsil eder; markanın değil, öğretilen kavramın parçasıdır. |
| İnceleme modeli | Tarayıcı geliştirici araçlarındaki “öğeyi incele” gibi | Neredeyse her öğe kendini anlatabilsin; yeni öğe eklemek tek bir `data-inspect` niteliği kadar kolay olsun. |
| Örnek sitelerde kaydırma | Kendi içinde kaydırma yok; Apple'ın ürün sayfalarındaki gibi pencere sabitlenir, sayfa kaydırması içindeki siteyi kaydırır | İç içe kaydırma (sayfanın içinde kayan bir pencere) imleci tuzağa düşürüyor ve sayfayı kullanmayı zorlaştırıyordu. |

## Sayfa yapısı (bilgi mimarisi)

```
Üst menü      Logo · Examples · Features · Pricing ········ Tema · Sign in   (yapışkan)
Kapak         [ PROJECT WINGMAN ] · “Every PM needs a wingman.” · See examples / Get started
[01] Examples Acme (pazarlama) · Orbit (analiz paneli) · Wave (alışkanlık) · Muse (yapay zekâ) · Stride (alışveriş)
[02] Features Yavaşça akan kayan şerit (durdurma düğmesi)
[03] Pricing  Free · Pro · Team (fiyatlar yer tutucu)
Footer        Yazı linkleri · Back to top
```

- **Üst menü bar değildir ama yapışkandır:** Sayfanın tepesinde tamamen şeffaftır; aşağı inildikçe kenarlıksız bir buzlu cam zemin alır. Linkler bölümlere götürür, logo en tepeye döner, görünümdeki bölümün linki koyulaşır. Bölümler `scroll-margin-top` ile menünün altında durur.
- **Footer:** Bar değil, sayfa zemininde duran yazı linkleridir.
- **Ana sayfa yalnızca beş örnek proje gösterir:** Kütüphanenin tamamı ve “Sign in” sonrası alanlar sonraki aşamada gelecek.
- **Örnek yerleşimi:**
  - Siteler (Acme, Orbit): Her biri kendi kaydırma sahnesinde, sayfa genişliğinde, alt alta.
    - Pencere üst menünün altına sabitlenir. Sahne, içeriğin taşan kısmı kadar uzar; sayfa kaydırması bire bir pencerenin içine aktarılır.
    - Kullanıcı pencerenin içinde ayrıca kaydırmaz. İçerik gerçekten kaydırıldığı için (`overflow: hidden` + `scrollTop`) Acme'nin yapışkan cam navbar'ı çalışmaya devam eder.
  - Telefonlar: Her genişlikte üçü tek sırada. Sığmazlarsa birlikte küçülürler (`--phone-scale`; telefonda ~0,35); dar sırada başlıkta yalnızca sıra numarası ve ad kalır.

## İnceleme etkileşimi

| Girdi | Davranış |
| --- | --- |
| Fare | Üzerine gelince yeşil anahat ve ad etiketi hemen; 280 ms duraksamada özet balonu. Önizleme açıkken başka öğeye geçmek balonu beklemeden günceller. Tıklamak tam açıklamayı sabitler. |
| Dokunmatik | Dokunmak tam açıklamayı açar; başka öğeye dokunmak geçiş yapar; dışarı dokunmak kapatır, kaydırmak kapatmaz. |
| Klavye | Her örnek tek sekme durağıdır. Oklar ve Home/End öğeler arasında gezdirir, Enter sabitler, Esc kapatır. Canlı bölge, öğenin adını ve özetini ekran okuyucuya okur. Sitelerde seçilen öğe pencerede görünmüyorsa sayfa onu gösterecek konuma kayar. |

Balon önizlemede dar (ad, özet, terim etiketleri), sabitlenince geniştir (gündelik karşılıklar, kavramların sade açıklaması). Altta yer yoksa üste döner; bütün çerçeveleri kapsayan ortak katmana çizildiği için çerçeve kenarında kırpılmaz.

Küçültülmüş telefonlarda ve yerine oturan pencerelerde anahat ve ad etiketi ölçeğin tersiyle çizilir: anahat ince, etiket okunur kalır.

**Hareketli demolar incelenirken durur.** Muse'un açılır menüsü boştayken kendi kendine açılıp kapanır. İmleç örneğin üzerindeyken, klavye odağı içindeyken ya da bir balon açıkken açık kalır ki menünün kendisi de incelenebilsin. Demolar bu durumu `useInspectActivity()` ile okur.

## Mobil demolar

- **Wave:** Klasik iOS dili. Açık zemin, liste satırları, açma/kapama anahtarları, FAB, alt sekme çubuğu.
- **Muse:** Yenilikçi uygulama tipi; yapay zekâ asistanı ve Liquid Glass dili. Koyu, renkli bir zemin üzerinde yüzen cam navbar, kendi kendine açılıp kapanan cam açılır menü, sohbet balonları, yazıyor göstergesi, cam öneri çipleri, cam mesaj kutusu ve renk çemberli ses düğmesi.
  - Liquid Glass tarifi: `backdrop-filter: blur() saturate(180%)`, yarı saydam beyaz zemin, ince beyaz kenarlık ve üst kenarda iç gölgeyle bir ışık çizgisi.
- **Stride:** Alışveriş ürün sayfası. Koleksiyonun “mutlaka olması gereken” parçası, çünkü PM'lerin en sık adını aradığı öğeleri tek ekranda toplar:
  - Fotoğraf galerisi ve sayfa noktaları.
  - Sayı rozeti, favori düğmesi, indirim rozeti ve üstü çizili fiyat.
  - Yıldız puanı, renk ve beden seçici (tükenmiş beden durumu dahil).
  - Adet seçici ve sabit satın alma çubuğu.
  - Kendi kendine gelip giden toast (incelenirken görünür kalır).

## Renk token'ları

Tümü `src/styles/tokens.css` içindedir ve `light-dark(açık, koyu)` ile tanımlanır; bileşenler yalnızca token kullanır.

| Token | Açık | Koyu | Kullanım |
| --- | --- | --- | --- |
| `--color-bg` | `#fcfcfc` | `#141414` | Sayfa zemini |
| `--color-surface` | `#ffffff` | `#1a1a1a` | Kart, plan |
| `--color-surface-2` | `#f5f5f5` | `#1c1c1c` | Değer kartı, pencere çubuğu |
| `--color-text` | `#171717` | `#fafafa` | Ana metin |
| `--color-text-muted` | `#5c5c5c` | `#a3a3a3` | Destekleyici metin |
| `--color-text-subtle` | `#6b6b6b` | `#8f8f8f` | Etiket, menü linki |
| `--color-text-faint` | `#7a7a7a` | `#6b6b6b` | Yalnızca iki tonlu büyük başlıkların ikinci yarısı |
| `--color-border` | `#e5e5e5` | `#262626` | Kıl çizgisi |
| `--color-primary` | `#171717` | `#fafafa` | Ana buton (koyu temada ters) |
| `--color-fill-secondary` | siyah %6 | beyaz %8 | İkincil buton (LayerZero'daki gri düğme) |
| `--color-accent` | `#0a8f65` | `#0fb983` | Metin dışı vurgu |
| `--color-accent-text` | `#087a56` | `#0fb983` | Vurgulu metin |
| `--color-inspect` | `#0a8f65` | `#0a8f65` | İnceleme anahattı (sabit: örnekler hep açık renkli) |

Açıklama balonu açık temada ters yüzey (`#171717`), koyu temada bir kademe yükselmiş yüzey (`#202020`) kullanır.

## Tipografi

Yazı tipleri ve ölçüler LayerZero'dan birebir alındı.

- **Kapak başlığı:** Roboto 400, satır yüksekliği 1.08, harf aralığı `-0.048em` (LayerZero h1: 52/56, −2.5 px). Tek satırlık vaat.
- **Bölüm başlıkları:** Roboto 400, 1.2, `-0.05em` (LayerZero h2: 40/48, −2 px). İki tonlu: ilk kısım `--color-text`, devamı `--color-text-faint`. Üstünde mono `[01] EXAMPLES` etiketi.
- **Kart başlıkları:** Roboto 400, 20/28, `-0.025em`.
- **Gövde:** Roboto 400, 16 px / 1.5.
- **Mono:** Roboto Mono 400, 12/16, normal harf aralığı. `[ PROJECT WINGMAN ]` etiketi, sıra numaraları, teknik terimler, sayaçlar.

## Şekil, yüzey ve hareket

- **Köşeler:** Butonlar tam yuvarlak (hap); tema düğmesi ve kart okları daire. Kartlar 8–12 px; etiket ve rozetler tam yuvarlak.
- **Yüzeyler düz:** Gölge yok; ayrım kıl çizgileriyle yapılır. Yalnızca yüzen öğeler (balon, telefon) gölge alır.
- **Hareket:**
  - Çizgiler ~3,2 saniyede bir ışın aralığı kadar soldan sağa akar; odak 16 saniyelik döngüyle hafifçe salınır.
  - Kayan yıldız seyrektir: ilki ~3 saniye sonra, sonrakiler 8–14 saniyelik rastgele aralıklarla gelir.
    - Yol: 2–5 ışık (her seferinde rastgele) soldan birbirinden uzak ışınlardan hızlanarak gelir ve odakta aynı anda buluşur (kısa, yumuşak bir parlama). Birleşen ışık sağda bir öncekinden farklı bir ışından yavaşlayarak çıkar ve kenara yaklaşırken söner. Işık, kaydığı ışını her karede yeniden hesaplayarak izler; akan çizginin içinden ayrılmaz.
    - Biçim: Damla. Dolgun, yuvarlak bir baş ve arkasında incelip saydamlaşan tek parça bir kuyruk; noktalı iz yok. Yavaşken kısa bir damla, odaktan geçerken uzun bir ışın olur. Rengi çizgilerle aynıdır, temaya uyar; açık temada başın ışıması kısılır.
  - Site sahneleri: Pencere sabitleneceği konuma gelirken %92'den %100'e büyüyerek oturur. Sabitlenince içerik kaymaya başlamadan önce ve sonunda kısa bir bekleme olur (ekran yüksekliğinin ~%12'si, en fazla 120 px). Kaydırırken sağda macOS'taki gibi ince bir kaydırma çubuğu belirir.
  - Features şeridi: İki özdeş grup uç uca dizilir ve 80 saniyede bir grup boyu (~25–30 px/sn) sola akar; kenarlar yumuşakça kaybolur. İmleç üzerindeyken ya da düğmeyle durur.
  - İnceleme anahattı öğeler arasında 120 ms'de kayar.
  - Tema değişimi, destekleyen tarayıcılarda View Transitions ile yumuşak bir çapraz geçişle olur.
  - `prefers-reduced-motion` açıkken çizgiler sabit kalır ve kayan yıldız çıkmaz, Muse'un menüsü açık durur, Features şeridi akmaz (kartlar sıralı durur), pencereler büyüyerek oturmaz; diğer animasyonlar ve yumuşak kaydırma da durur. Site sahnelerinde içerik yine sayfayla birlikte kayar; bu, normal kaydırmayla aynı hızdadır.

## Erişilebilirlik notları

- Açık temada yeşil metin için `#087a56` kullanılır (~5.2:1); `#0a8f65` (~4:1) yalnızca çerçeve ve ikonlar içindir.
- İki tonlu başlıkların gri kısmı büyük metin kuralını karşılar: açıkta ~4.2:1, koyuda ~3.5:1.
- Örnek demolar ekran okuyuculardan gizlidir (`aria-hidden`); yerine her örnek odaklanabilir tek bir bölgedir ve gezilen öğe canlı bölgeyle duyurulur.
- Demolarda gerçek link/düğme yoktur (href'siz `<a>`, `<span>`); böylece sekme sırası bozulmaz.
- Features şeridi kendiliğinden hareket ettiği için görünür bir durdurma düğmesi vardır (WCAG 2.2.2). Döngü için eklenen ikinci kopya ekran okuyuculardan gizlidir.

## Referanslar

- [layerzero.network](https://layerzero.network): açık tema, monokrom, kapaktaki birleşen ışınlar, `[ ]` etiketleri, iki tonlu başlıklar, gri ikincil butonlar, yazı tipleri (Roboto, Roboto Mono) ve tipografi ölçüleri.
- [apple.com](https://www.apple.com) ürün sayfaları: sabitlenen ve sayfa kaydırıldıkça değişen sahneler.
- [stargate.finance/overview](https://stargate.finance/overview): koyu tema, tek zümrüt vurgu, düz ve kenarlıklı kartlar, Geist.
