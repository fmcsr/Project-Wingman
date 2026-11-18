import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the File dropzone element, in the order they appear. `value` fields are the actual values from
 * FileDropzone.
 */
export const fileDropzoneSpecs: UiElementSpec[] = [
  {
    id: 'file-dropzone',
    name: 'Dropzone',
    htmlTag: '<div> + <input type="file" multiple>',
    variant: 'Drag and drop or browse · PNG, JPG, PDF up to 10 MB',
    summary:
      'An area that takes files dragged onto it from the desktop. A click on it opens the file picker instead, and it says up front which files it accepts.',
    aliases: ['drop area', 'upload box', 'drag-and-drop area', 'file upload', 'the dashed box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Dashed border',
        value: {
          light: 'border: 1.5px dashed #c4c7cf · border-radius: 12px',
          dark: 'border: 1.5px dashed #4a4c54 · border-radius: 12px',
        },
        plain:
          'A dashed outline is the convention for “drop something here”: a box drawn as not quite solid, waiting to be filled.',
      },
      {
        kind: 'behavior',
        term: 'Click to browse',
        value: '“browse” opens the file picker',
        plain: 'Not everyone drags. The same area works as a button that opens the usual file picker.',
      },
      {
        kind: 'appearance',
        term: 'Accepted types and limit',
        value: 'accept=".png,.jpg,.pdf" · 10 MB',
        plain: 'The small gray line under the prompt says what will be turned away, before anyone tries.',
      },
    ],
  },
  {
    id: 'file-dropzone-drag-over',
    name: 'Drag-over state',
    htmlTag: '<div data-drag-over>',
    variant: 'Accent outline · tint · “Drop to upload”',
    summary:
      'How the zone looks while a file is dragged over it: lit up, with a banner that says what letting go will do. It’s the zone telling you it will take the file.',
    aliases: ['drop target highlight', 'hover state', 'active dropzone', 'the blue outline when you drag'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Highlight',
        value: {
          light: 'border-color: #1e6bf0 · background: rgb(30 107 240 / 0.06)',
          dark: 'border-color: #6ea4ff · background: rgb(110 164 255 / 0.09)',
        },
        plain: 'The dashed outline turns blue and the inside takes a light blue tint.',
      },
      {
        kind: 'appearance',
        term: 'Drop banner',
        value: '28px pill · “Drop to upload”',
        plain:
          'A blue pill rises in at the bottom of the zone, and the prompt fades out to leave room for the file being dragged.',
      },
      {
        kind: 'behavior',
        term: 'dragenter / dragleave',
        value: '150ms fade in and out',
        plain:
          'The page notices a file coming over the zone and switches this state on; drag the file away and the zone goes back to normal.',
      },
    ],
  },
  {
    id: 'file-dropzone-row',
    name: 'Upload row',
    htmlTag: '<li>',
    variant: 'Thumbnail · name · size · one action',
    summary:
      'One file in the list under way or sent: what it is, how big it is and how its upload is going, with the one action that makes sense right now.',
    aliases: ['file item', 'attachment', 'upload item', 'file card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'File card',
        value: {
          light: 'height: 56px · border: 1px solid #e4e5e9 · border-radius: 10px',
          dark: 'height: 56px · border: 1px solid #2f3137 · border-radius: 10px',
        },
        plain:
          'Each file gets a small card: a 36px thumbnail (the photo itself, or the file type for a document), the name, then the size.',
      },
      {
        kind: 'behavior',
        term: 'Newest first',
        value: 'slides in at the top · 260ms',
        plain: 'A new file takes the top of the list and pushes the others down, so what you just added is in view.',
      },
      {
        kind: 'behavior',
        term: 'Row states',
        value: 'uploading · done · refused',
        plain:
          'The row changes with the upload: a progress bar and a cancel button while it’s sending, a green check when it’s done, a red reason when it’s refused.',
      },
    ],
  },
  {
    id: 'file-dropzone-progress',
    name: 'Progress bar',
    htmlTag: '<progress value max>',
    variant: 'Determinate · 4px',
    summary:
      'A thin bar that fills from left to right as the file goes up. The part that’s filled is the part that’s been sent.',
    aliases: ['loading bar', 'upload progress', 'progress indicator', 'the blue line'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Determinate bar',
        value: { light: 'height: 4px · #1e6bf0 on #eff0f3', dark: 'height: 4px · #6ea4ff on #2a2c31' },
        plain:
          'Determinate means it knows how much is left, so it can show it; a spinner is the choice when nobody knows.',
      },
      {
        kind: 'behavior',
        term: 'Size counter',
        value: '1.8 MB of 3.2 MB',
        plain: 'The numbers above the bar count up with it, for anyone who wants the exact figure.',
      },
      {
        kind: 'behavior',
        term: 'Eased updates',
        value: 'transform: scaleX() · 250ms',
        plain:
          'Progress arrives in bursts as chunks of the file are sent. The bar glides to each new value instead of jumping, but keeps the uneven pace of a real upload.',
      },
    ],
  },
  {
    id: 'file-dropzone-cancel',
    name: 'Cancel button',
    htmlTag: '<button aria-label="Cancel upload">',
    variant: '× while uploading',
    summary: 'Stops an upload that’s still going and takes the file off the list.',
    aliases: ['stop upload', 'abort', 'the x on the file', 'remove'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon button',
        value: { light: '24px circle · #eff0f3 · 14px ×', dark: '24px circle · #2a2c31 · 14px ×' },
        plain: 'A gray × in a small round button at the end of the row.',
      },
      {
        kind: 'behavior',
        term: 'Swaps with the result',
        plain: 'It’s only there while the file is uploading; when the upload is done it gives way to a green check.',
      },
    ],
  },
  {
    id: 'file-dropzone-error',
    name: 'Error message',
    htmlTag: '<p role="alert">',
    variant: '“Larger than 10 MB”',
    summary: 'Why a file was turned away, in the file’s own row, so you know which one failed and what to change.',
    aliases: ['validation error', 'upload failed', 'error text', 'the red message'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Inline error',
        value: { light: 'color: #d92d20 · row: #fef5f4', dark: 'color: #ff7a6e · row: rgb(255 122 110 / 0.07)' },
        plain: 'Red text with a warning icon in place of the size, on a card tinted pale red.',
      },
      {
        kind: 'behavior',
        term: 'Checked on drop',
        value: '14.8 MB > 10 MB',
        plain:
          'The browser knows a file’s size the moment it’s dropped, so a file that’s too big is refused at once instead of failing halfway up.',
      },
      {
        kind: 'behavior',
        term: 'Recovery action',
        value: '“Replace”',
        plain:
          'A good error says what to do next. Sending the same file again would fail again, so the way to retry is Replace: pick a smaller file in its place.',
      },
    ],
  },
];
