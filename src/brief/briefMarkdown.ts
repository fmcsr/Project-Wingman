import type { Concept, ConceptKind, ThemedValue } from '../catalog';
import type { ResolvedItem } from './briefStore';

const GROUPS: { kind: ConceptKind; label: string }[] = [
  { kind: 'appearance', label: 'Look' },
  { kind: 'behavior', label: 'Behavior' },
];

const INSTRUCTIONS =
  'Build the elements below. Each one says what it is, how it should look and how it should behave, with ' +
  'reference values from a working example. Match the look and behavior; where the project already has ' +
  'components or design tokens, use those instead of the raw values.';

/** A value in backticks. A color that differs between the themes gets both. */
function formatValue(value: string | ThemedValue) {
  if (typeof value === 'string') return `\`${value}\``;
  if (value.light === value.dark) return `\`${value.light}\``;
  return `\`${value.light}\` in light mode, \`${value.dark}\` in dark mode`;
}

function differsByTheme(concept: Concept) {
  return typeof concept.value === 'object' && concept.value.light !== concept.value.dark;
}

/** A note on one line, so it can sit in a list item. */
function oneLine(text: string) {
  return text.trim().replace(/\s*\n\s*/g, ' ');
}

/** The term to use with the coding tool, the example's value and what it does. */
function conceptText(concept: Concept) {
  const value = concept.value ? ` (${formatValue(concept.value)})` : '';
  return `**${concept.term}**${value}: ${concept.plain}`;
}

function elementSection({ item, spec }: ResolvedItem, index: number) {
  const lines = [`### ${index + 1}. ${spec.name}${spec.htmlTag ? ` (\`${spec.htmlTag}\`)` : ''}`, ''];
  if (spec.variant) lines.push(`Variant: ${spec.variant}`, '');
  lines.push(spec.summary, '');
  if (spec.aliases.length > 0) lines.push(`Also called: ${spec.aliases.map((alias) => `“${alias}”`).join(', ')}`, '');
  for (const { kind, label } of GROUPS) {
    const concepts = spec.concepts.filter((concept) => concept.kind === kind);
    if (concepts.length > 0) lines.push(`${label}:`, '', ...concepts.map((concept) => `- ${conceptText(concept)}`), '');
  }
  if (item.note.trim()) lines.push(`**Note:** ${oneLine(item.note)}`, '');
  return lines;
}

/**
 * The brief as Markdown, written for an AI coding tool: what we're building, each element with the terms and
 * reference values to use, and acceptance criteria to check the result against. The criteria come from the
 * elements' behaviors and the user's notes.
 */
export function briefToMarkdown(goal: string, items: ResolvedItem[]) {
  const lines = ['# UI brief', ''];
  if (goal.trim()) lines.push('## Goal', '', goal.trim(), '');
  lines.push('## Elements', '', INSTRUCTIONS, '');
  items.forEach((resolved, index) => lines.push(...elementSection(resolved, index)));

  const criteria = items.flatMap(({ item, spec }) => [
    ...spec.concepts
      .filter((concept) => concept.kind === 'behavior')
      .map((concept) => `- [ ] ${spec.name} · ${conceptText(concept)}`),
    ...(item.note.trim() ? [`- [ ] ${spec.name}: ${oneLine(item.note)}`] : []),
  ]);
  if (items.some(({ spec }) => spec.concepts.some(differsByTheme))) {
    criteria.push('- [ ] Light and dark mode each use the colors given for them above.');
  }
  if (criteria.length > 0) lines.push('## Acceptance criteria', '', ...criteria, '');

  return `${lines.join('\n').trimEnd()}\n`;
}
