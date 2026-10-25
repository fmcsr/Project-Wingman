export type ConceptKind = 'appearance' | 'behavior';

/** A single technical concept behind a UI element. */
export type Concept = {
  kind: ConceptKind;
  /** The term to use with the coding tool, e.g. "backdrop-filter". */
  term: string;
  /** A plain explanation for someone with no technical background. */
  plain: string;
  /** The actual value used in the example; shown next to the term, e.g. "blur(16px)". */
  value?: string;
};

/** The explanation content for a UI element in the showcase. */
export type UiElementSpec = {
  id: string;
  /** Technical name, e.g. "Navbar". */
  name: string;
  /** The matching HTML tag, e.g. "<nav>". */
  htmlTag?: string;
  /** The variant shown in the example, e.g. "Sticky · Glassmorphism". */
  variant?: string;
  /** A short description, one or two sentences long. */
  summary: string;
  /** How users describe this element in everyday language. */
  aliases: string[];
  concepts: Concept[];
};
