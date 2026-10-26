export type ConceptKind = 'appearance' | 'behavior';

/** A value that differs between the light and dark theme, such as a background color. */
export type ThemedValue = { light: string; dark: string };

/** A single technical concept behind a UI element. */
export type Concept = {
  kind: ConceptKind;
  /** The term to use with the coding tool, e.g. "backdrop-filter". */
  term: string;
  /** A plain explanation for someone with no technical background. */
  plain: string;
  /** The actual value used in the example; shown next to the term, e.g. "blur(16px)". Colors give one per theme. */
  value?: string | ThemedValue;
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
