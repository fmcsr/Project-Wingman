/** Üst menü ve footer'ın paylaştığı bölüm linkleri. */
export const SECTION_LINKS = [
  { href: '#examples', label: 'Examples' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
];

/** Bölüm kimlikleri (üst menüde hangi bölümün görünümde olduğunu izlemek için). */
export const SECTION_IDS = SECTION_LINKS.map((link) => link.href.slice(1));

/** Giriş ve hesap sayfaları sonraki aşamada gelecek; şimdilik yer tutucu. */
export const SIGN_IN_HREF = '#sign-in';
