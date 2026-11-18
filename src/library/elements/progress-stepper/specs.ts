import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Progress stepper element, in the order they appear. `value` fields are the actual values from
 * ProgressStepper.
 */
export const progressStepperSpecs: UiElementSpec[] = [
  {
    id: 'progress-stepper',
    name: 'Progress stepper',
    htmlTag: '<ol aria-label="Setup progress">',
    variant: '4 steps · numbered, with connectors',
    summary:
      'The row of steps above a form that’s split into parts: which steps are done, which one you’re on and how many are left. On a phone it shrinks to “Step 2 of 4” over a segmented bar.',
    aliases: ['stepper', 'wizard steps', 'progress tracker', 'step indicator', 'the numbered circles at the top'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Horizontal stepper',
        value: '24px circles · 2px lines · labels beside',
        plain:
          'Each step is a numbered circle with its name, joined to the next by a thin line, so the whole flow reads left to right at a glance.',
      },
      {
        kind: 'behavior',
        term: 'Responsive stepper',
        value: 'under 460px: “Step 2 of 4” + 4 segments',
        plain: 'Where four labels don’t fit, a count and a bar of four segments say the same thing in one line.',
      },
      {
        kind: 'behavior',
        term: 'Back keeps your answers',
        value: 'Back · Continue',
        plain:
          'Going back undoes the step’s check but not what you typed, so moving between steps never costs any work.',
      },
    ],
  },
  {
    id: 'progress-stepper-done',
    name: 'Completed step',
    htmlTag: '<li>',
    variant: 'Account · filled, with a check',
    summary: 'A step that’s finished: its circle fills in and the number turns into a check.',
    aliases: ['done step', 'checked step', 'finished step', 'the step with the check'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Filled circle',
        value: { light: 'background: #3b5bdb · white check', dark: 'background: #6e8bff · dark check' },
        plain: 'Solid accent with a check: the strongest mark in the row, because it’s settled.',
      },
      {
        kind: 'behavior',
        term: 'Check draws in',
        value: 'stroke-dashoffset · 250ms',
        plain: 'On Continue the check draws itself stroke by stroke rather than popping in, so you see the step close.',
      },
      {
        kind: 'behavior',
        term: 'Can go back',
        value: 'click or Back',
        plain: 'Done steps stay reachable: you can return to fix something without starting over.',
      },
    ],
  },
  {
    id: 'progress-stepper-current',
    name: 'Current step',
    htmlTag: '<li aria-current="step">',
    variant: 'Workspace · accent ring',
    summary: 'The step whose form is open below. Its ring and darker label say “you are here”.',
    aliases: ['active step', 'you are here', 'selected step', 'the highlighted circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Ring and halo',
        value: {
          light: 'border: 1.5px #3b5bdb · box-shadow: 0 0 0 4px rgb(59 91 219 / 0.16)',
          dark: 'border: 1.5px #6e8bff · box-shadow: 0 0 0 4px rgb(110 139 255 / 0.24)',
        },
        plain: 'An accent outline with a soft glow around it: marked, but not filled like a finished step.',
      },
      {
        kind: 'behavior',
        term: 'aria-current="step"',
        value: 'on one step',
        plain: 'Tells screen readers which step you’re on, the way the ring tells everyone else.',
      },
      {
        kind: 'behavior',
        term: 'Moves on after the line',
        value: '300ms delay',
        plain: 'The ring arrives once the line from the step before has filled, so the eye follows one movement.',
      },
    ],
  },
  {
    id: 'progress-stepper-connector',
    name: 'Connector',
    htmlTag: '<span>',
    variant: '2px line · fills when a step is done',
    summary: 'The line between two steps. It fills with the accent once the step before it is done, like a progress bar.',
    aliases: ['step line', 'progress line', 'divider between steps', 'the line between the circles'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Track and fill',
        value: { light: '2px · #e3e8ee, filled #3b5bdb', dark: '2px · #262b35, filled #6e8bff' },
        plain: 'A pale line that turns blue: gray for what’s ahead, color for what’s behind you.',
      },
      {
        kind: 'behavior',
        term: 'Fill animation',
        value: 'scaleX(0 → 1) · 250ms after 150ms',
        plain: 'It fills from left to right just after the check, carrying the eye to the next step; going back empties it.',
      },
    ],
  },
  {
    id: 'progress-stepper-upcoming',
    name: 'Upcoming step',
    htmlTag: '<li>',
    variant: 'Billing · gray',
    summary: 'A step still ahead: a gray ring and label, so you know what’s coming without it competing for attention.',
    aliases: ['next step', 'future step', 'disabled step', 'the gray circles'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Muted ring',
        value: { light: 'border: 1.5px #c9d0da · number #8792a2', dark: 'border: 1.5px #3a4150 · number #6b7385' },
        plain: 'Outlined in light gray with a gray number: present, but clearly not yet.',
      },
      {
        kind: 'behavior',
        term: 'Not clickable yet',
        value: 'locked until the steps before are done',
        plain: 'You can’t jump ahead to Billing before setting up the workspace; the order keeps every step valid.',
      },
    ],
  },
];
