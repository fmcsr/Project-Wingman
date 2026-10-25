export type ConceptKind = 'appearance' | 'behavior';

/** Bir UI öğesinin arkasındaki tek bir teknik kavram. */
export type Concept = {
  kind: ConceptKind;
  /** Kodlama aracına söylenecek terim, ör. "backdrop-filter". */
  term: string;
  /** Teknik bilgisi olmayan biri için sade açıklama. */
  plain: string;
  /** Örnekte kullanılan gerçek değer; terimin yanında gösterilir, ör. "blur(16px)". */
  value?: string;
};

/** Vitrindeki bir UI öğesinin açıklama içeriği. */
export type UiElementSpec = {
  id: string;
  /** Teknik ad, ör. "Navbar". */
  name: string;
  /** İlgili HTML etiketi, ör. "<nav>". */
  htmlTag?: string;
  /** Örnekteki çeşit, ör. "Sticky · Glassmorphism". */
  variant?: string;
  /** Bir iki cümlelik kısa açıklama. */
  summary: string;
  /** Kullanıcıların bu öğeyi gündelik dilde nasıl tarif ettiği. */
  aliases: string[];
  concepts: Concept[];
};
