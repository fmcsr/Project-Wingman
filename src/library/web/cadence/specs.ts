import type { UiElementSpec } from '../../../catalog';

/** Elements in the Cadence calendar. `value` fields are the actual values from CadenceSite.module.css and markup. */
export const cadenceSpecs: UiElementSpec[] = [
  {
    id: 'mini-calendar',
    name: 'Mini calendar',
    htmlTag: '<table>',
    variant: 'Month grid · Days on screen · Today',
    summary:
      'A small month in the sidebar for jumping to any date. The days the week view shows sit on a gray band, and today is a filled circle.',
    aliases: ['date picker', 'mini month', 'the little calendar on the left', 'month navigator'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Range highlight',
        value: { light: 'background: #e9e9e6', dark: 'background: #2c2c2c' },
        plain:
          'Monday 16 to Friday 20 share one rounded band: the five days on screen, so you can see where you are in the month.',
      },
      {
        kind: 'appearance',
        term: 'Today marker',
        value: {
          light: 'background: #6453e0 · border-radius: 50%',
          dark: 'background: #7161ea · border-radius: 50%',
        },
        plain: 'The 17th is a filled iris circle, the same color today has in the week.',
      },
      {
        kind: 'appearance',
        term: 'Days outside the month',
        value: { light: 'color: #a6a5a0', dark: 'color: #6f6e6a' },
        plain: 'The end of October and the start of December fill the first and last rows in a lighter gray.',
      },
      {
        kind: 'behavior',
        term: 'Jump to a date',
        value: 'click a day · ‹ ›',
        plain:
          'Clicking a day moves the week there. The arrows beside the month page through months without moving the week.',
      },
    ],
  },
  {
    id: 'people-search',
    name: 'People search',
    htmlTag: '<div role="search">',
    variant: 'Meet with…',
    summary:
      'A field in the sidebar for finding a colleague. Their calendar appears next to yours, so you can see when you are both free.',
    aliases: ['meet with', 'find a time', 'search for people', 'calendar overlay'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Calendar overlay',
        value: '“Meet with…”',
        plain:
          "Picking someone lays their busy times over your week in a color of their own, without opening their calendar.",
      },
      {
        kind: 'appearance',
        term: 'Filled field',
        value: { light: 'background: #ededea · height: 30px', dark: 'background: #282828 · height: 30px' },
        plain: 'A gray fill instead of a border keeps it quiet in the sidebar until you need it.',
      },
    ],
  },
  {
    id: 'calendar-list',
    name: 'Calendar list',
    htmlTag: '<ul>',
    variant: 'Accounts · Color toggles',
    summary:
      'Every calendar you can see, grouped by account. Each box is both the calendar’s color and a switch that shows or hides its events.',
    aliases: ['my calendars', 'calendar toggles', 'the checkboxes on the left', 'layers'],
    concepts: [
      {
        kind: 'behavior',
        term: 'role="checkbox"',
        value: 'aria-checked="false"',
        plain: 'Holidays in Germany is switched off: its box is empty, and its days off are gone from the week.',
      },
      {
        kind: 'appearance',
        term: 'Color-coded box',
        value: '15 × 15px · border-radius: 4px',
        plain: 'A box filled with the calendar’s color and a check, the same color its events wear in the week.',
      },
      {
        kind: 'appearance',
        term: 'Account groups',
        value: '“sofia@fernway.co” · “Personal”',
        plain: 'Work and personal calendars sit under their own heading, and each group folds away with its chevron.',
      },
    ],
  },
  {
    id: 'today-button',
    name: 'Today button',
    htmlTag: '<button>',
    variant: 'Outlined · Shortcut T',
    summary: 'Brings the view back to the current day, wherever you have paged to.',
    aliases: ['go to today', 'jump to today', 'back to now'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Keyboard shortcut',
        value: 'aria-keyshortcuts="T"',
        plain: 'Pressing T does the same from anywhere in the calendar.',
      },
      {
        kind: 'appearance',
        term: 'Outlined button',
        value: {
          light: 'border: 1px solid #e3e3e0 · border-radius: 6px',
          dark: 'border: 1px solid #2f2f2f · border-radius: 6px',
        },
        plain: 'A thin border sets it apart from the arrows beside it, which are bare icons.',
      },
    ],
  },
  {
    id: 'period-arrows',
    name: 'Previous and next arrows',
    htmlTag: '<button>',
    variant: 'Chevrons · One week per step',
    summary: 'Two chevrons that step back or forward by what the view shows: a week here, a day in day view.',
    aliases: ['back and forward', 'paging arrows', 'next week', 'chevrons'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Steps by the view',
        value: 'aria-label="Previous week"',
        plain: 'Switch to Month and the same arrows move a month at a time; their labels change to match.',
      },
      {
        kind: 'behavior',
        term: 'Keyboard shortcuts',
        value: 'aria-keyshortcuts="J" · "K"',
        plain: 'J and K flip back and forward through weeks without the mouse.',
      },
      {
        kind: 'appearance',
        term: 'Icon buttons',
        value: '26 × 28px · gray chevrons',
        plain: 'Just two gray chevrons, so the dates beside them stay the boldest thing in the toolbar.',
      },
    ],
  },
  {
    id: 'date-range',
    name: 'Date range',
    htmlTag: '<h2>',
    variant: 'Days on screen · Year in gray',
    summary: 'The title of the view: which days are on screen. It changes as you page through weeks or switch views.',
    aliases: ['period title', 'the dates at the top', 'week label', 'calendar heading'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Compact range',
        value: '“Nov 16 – 20, 2026”',
        plain:
          'The month is written once and the year comes last, in gray. A week across two months reads “Nov 30 – Dec 4”.',
      },
      {
        kind: 'appearance',
        term: 'Heading size',
        value: 'font-size: 18px · font-weight: 650',
        plain: 'The largest text in the toolbar, so you always know which days you are looking at.',
      },
      {
        kind: 'behavior',
        term: 'Follows the view',
        value: '@container (width < 640px)',
        plain: 'On a phone the grid shows three days, and the title changes with it: Nov 17 – 19.',
      },
    ],
  },
  {
    id: 'view-switcher',
    name: 'View switcher',
    htmlTag: '<button aria-haspopup="menu">',
    variant: 'Dropdown · Week',
    summary: 'Picks how much time the grid shows: a day, a week, a month or a number of days.',
    aliases: ['view picker', 'day, week, month', 'calendar view menu'],
    concepts: [
      {
        kind: 'behavior',
        term: 'aria-haspopup',
        value: 'aria-haspopup="menu"',
        plain: 'It opens a menu of views, each with a shortcut: D for day, W for week, M for month.',
      },
      {
        kind: 'behavior',
        term: 'Weekends hidden',
        value: 'Mon – Fri',
        plain: 'A setting in the same menu hides Saturdays and Sundays, which is why this week has five columns.',
      },
      {
        kind: 'appearance',
        term: 'Dropdown button',
        value: 'border-radius: 6px · chevron',
        plain: 'The current view’s name with a chevron, so it reads as a choice you can change.',
      },
    ],
  },
  {
    id: 'day-header',
    name: 'Day header',
    variant: 'Weekday and date · Today · Time zone',
    summary:
      'The weekday names and dates above the grid. Today’s date sits on an iris tile, and the corner names the time zone of every hour below.',
    aliases: ['column headers', 'day names', 'the dates above the columns', 'today highlight'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Today marker',
        value: {
          light: 'background: #6453e0 · border-radius: 6px',
          dark: 'background: #7161ea · border-radius: 6px',
        },
        plain: 'Tue 17 has a filled tile and a darker weekday, so today is found at a glance.',
      },
      {
        kind: 'appearance',
        term: 'Time zone label',
        value: '“GMT+1”',
        plain: 'Every time in the grid is in this zone. Calendars can add a second column for another one.',
      },
      {
        kind: 'behavior',
        term: 'position: sticky',
        value: 'top: 0',
        plain: 'The day names stay pinned at the top while the hours scroll under them.',
      },
    ],
  },
  {
    id: 'all-day-row',
    name: 'All-day row',
    variant: 'Multi-day bar · Lanes',
    summary:
      'A strip above the hours for events without a time: birthdays, deadlines and things that last several days.',
    aliases: ['all-day events', 'banner events', 'multi-day events', 'the strip above the hours'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Spanning bar',
        value: 'grid-column: wed / end',
        plain: 'The code freeze lasts Wednesday to Friday, so one bar runs across all three days instead of repeating.',
      },
      {
        kind: 'appearance',
        term: 'Stacked lanes',
        value: 'grid-template-rows: 22px 22px',
        plain:
          'Ana’s birthday falls during the freeze, so it opens a second lane under the bar rather than covering it.',
      },
      {
        kind: 'behavior',
        term: 'Pinned with the days',
        value: 'position: sticky',
        plain: 'It stays under the day names while you scroll, so all-day events never leave the screen.',
      },
    ],
  },
  {
    id: 'time-gutter',
    name: 'Time column',
    variant: 'Hour labels · Hour lines',
    summary: 'The narrow column of hours on the left. Each label sits on the line where its hour begins.',
    aliases: ['time axis', 'hour labels', 'time gutter', 'the times on the left'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Label on the line',
        value: 'transform: translateY(-50%)',
        plain:
          'Each hour is centered on its gridline rather than sitting inside the hour, so “2 PM” points exactly at 2:00.',
      },
      {
        kind: 'appearance',
        term: 'Hour height',
        value: '--hour: 56px',
        plain: 'Every hour is 56px tall, so an event’s height is its length: half an hour is half as tall.',
      },
      {
        kind: 'behavior',
        term: 'Scrolled to the day',
        value: '7 AM – 9 PM',
        plain: 'The night hours are there too; the grid opens scrolled to the working day.',
      },
    ],
  },
  {
    id: 'event-block',
    name: 'Event',
    variant: 'Tinted block · Calendar bar',
    summary:
      'A meeting on the grid: its top is when it starts, its height how long it lasts, and its color the calendar it belongs to.',
    aliases: ['event block', 'meeting', 'calendar event', 'time block', 'appointment'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Calendar color',
        value: {
          light: 'background: #e7f0fc · bar: #3b82e6',
          dark: 'background: #1b293b · bar: #4a8ef0',
        },
        plain:
          'Work is blue, team rituals teal and launches orange: a pale tint with a solid bar on the left, so a full week stays calm.',
      },
      {
        kind: 'appearance',
        term: 'Placed by time',
        value: 'top: calc(var(--start) * var(--hour))',
        plain: 'Its position and height are worked out from its start and length, never placed by hand.',
      },
      {
        kind: 'appearance',
        term: 'Title, then time',
        value: 'font-size: 12px · font-weight: 600',
        plain:
          'The title comes first, in bold; a half-hour event puts its start time beside the title to fit one line.',
      },
    ],
  },
  {
    id: 'overlapping-events',
    name: 'Overlapping events',
    variant: 'Side by side',
    summary:
      'Two events at the same time, here a design interview and the launch go/no-go, split the column instead of covering each other.',
    aliases: ['double booking', 'conflict', 'clashing meetings', 'events side by side'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Split column',
        value: 'width: 50% each',
        plain: 'Each takes half the day’s width, so both titles stay readable.',
      },
      {
        kind: 'appearance',
        term: 'Separating ring',
        value: { light: 'box-shadow: 0 0 0 1.5px #ffffff', dark: 'box-shadow: 0 0 0 1.5px #191919' },
        plain: 'A thin ring in the background color keeps the two apart where their edges meet.',
      },
      {
        kind: 'behavior',
        term: 'Shows a conflict',
        value: '11:30 AM – 12:00 PM',
        plain: 'Seeing them side by side is the cue that you are booked twice for that half hour.',
      },
    ],
  },
  {
    id: 'tentative-event',
    name: 'Tentative event',
    variant: 'Striped · Maybe',
    summary:
      'An event you answered Maybe to. The time is held, but striped instead of solid, because it isn’t certain yet.',
    aliases: ['maybe', 'unconfirmed event', 'striped event', 'hold', 'pending'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Diagonal stripes',
        value: 'repeating-linear-gradient(-45deg, …)',
        plain: 'Bands of the calendar’s tint and a paler one, instead of a solid fill.',
      },
      {
        kind: 'appearance',
        term: 'Says it in words',
        value: '“10:00 – 11:30 AM · Maybe”',
        plain: 'The time line says Maybe too, so the meaning never rests on the pattern alone.',
      },
      {
        kind: 'behavior',
        term: 'Follows your answer',
        value: 'Going? Yes · No · Maybe',
        plain: 'Answer Yes and it turns solid like the others; answer No and it fades.',
      },
    ],
  },
  {
    id: 'past-event',
    name: 'Past event',
    variant: 'Faded',
    summary: 'Events that have already ended fade back, so the rest of today and the days ahead stand out.',
    aliases: ['earlier events', 'dimmed event', 'faded meeting', 'finished event'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Reduced opacity',
        value: 'opacity: 0.5',
        plain: 'Everything before the red line, all of Monday and this morning, is drawn at half strength.',
      },
      {
        kind: 'behavior',
        term: 'Follows the clock',
        value: 'end < now',
        plain: 'An event fades the moment it ends; nobody has to mark it as done.',
      },
    ],
  },
  {
    id: 'selected-event',
    name: 'Selected event',
    variant: 'Solid fill · Lifted',
    summary:
      'The event whose details are open in the panel. It turns solid and lifts off the grid, so you can see which one the panel is about.',
    aliases: ['active event', 'highlighted meeting', 'open event', 'focused event'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Solid fill',
        value: { light: 'background: #2f74d8 · color: #ffffff', dark: 'background: #3878d9 · color: #ffffff' },
        plain: 'The pale tint becomes the calendar’s full color, with white text.',
      },
      {
        kind: 'appearance',
        term: 'Elevation',
        value: {
          light: 'box-shadow: 0 6px 16px rgb(23 52 99 / 0.22)',
          dark: 'box-shadow: 0 6px 16px rgb(0 0 0 / 0.55)',
        },
        plain: 'A soft shadow lifts it above the grid, like a card picked up from the table.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'aria-expanded="true"',
        plain: 'Tells screen readers that this event’s details are open.',
      },
    ],
  },
  {
    id: 'current-time-line',
    name: 'Current time indicator',
    variant: 'Red line · Time label',
    summary:
      'A red line at the present moment, with the time in the hour column: solid through today, faint across the rest of the week.',
    aliases: ['now line', 'the red line', 'time marker', 'now indicator'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Today’s line',
        value: { light: 'background: #dc3e42 · height: 2px', dark: 'background: #e5484d · height: 2px' },
        plain: 'Through today it is solid and starts with a dot; across the other days it is a faint guide.',
      },
      {
        kind: 'appearance',
        term: 'Time label',
        value: '“1:24 PM”',
        plain: 'The exact time in a red pill, in the column with the hours.',
      },
      {
        kind: 'behavior',
        term: 'Moves with the clock',
        value: 'top: (now − 7 AM) × 56px',
        plain:
          'It slides down as the minutes pass (here, one every few seconds), and the hour label it reaches steps aside. Everything above it counts as past.',
      },
    ],
  },
  {
    id: 'event-details',
    name: 'Event details panel',
    htmlTag: '<aside>',
    variant: 'Side panel · Sheet on phones',
    summary:
      'Everything about the selected event: its calendar, title, time and repeat, the call, the guests, the room, the notes and the reminder.',
    aliases: ['event panel', 'event popover', 'side panel', 'event card', 'inspector'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon rows',
        value: '16px icons · 10px gap',
        plain: 'Each detail gets one row behind a gray icon, so the panel reads from top to bottom at a glance.',
      },
      {
        kind: 'behavior',
        term: 'Countdown',
        value: '“in 36 min”',
        plain: 'A chip in iris says how soon the event starts, and counts down with the clock.',
      },
      {
        kind: 'behavior',
        term: 'Sheet on phones',
        value: '@container (width < 860px)',
        plain:
          'Without room for a side panel, the details move into a sheet pinned to the bottom, with just the essentials.',
      },
    ],
  },
  {
    id: 'join-button',
    name: 'Join button',
    htmlTag: '<button>',
    variant: 'Primary · Shortcut ⌘J',
    summary: 'Opens the event’s video call in one click. The link sits under it, ready to copy.',
    aliases: ['join meeting', 'join call', 'video call link', 'conference button'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Primary button',
        value: { light: 'background: #6453e0 · height: 34px', dark: 'background: #7161ea · height: 34px' },
        plain: 'The only filled button in the panel, in iris, because joining is what you came for at meeting time.',
      },
      {
        kind: 'behavior',
        term: 'Keyboard shortcut',
        value: 'aria-keyshortcuts="Meta+J"',
        plain: 'Command + J joins the next call without finding the event first.',
      },
      {
        kind: 'behavior',
        term: 'Copy link',
        value: 'meet.cadence.app/kcv-rtpw',
        plain: 'The address under the button copies with one click, for pasting into a chat.',
      },
    ],
  },
  {
    id: 'attendee-list',
    name: 'Guest list',
    htmlTag: '<ul>',
    variant: 'Answer badges · Organizer',
    summary:
      'Who is invited and how each person answered: a badge on every photo and a tally of yes, maybe and awaiting at the top.',
    aliases: ['attendees', 'participants', 'invitees', 'RSVP list'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Answer badge',
        value: { light: 'yes: #2f9a5c · maybe: #8d8c87', dark: 'yes: #39a866 · maybe: #77766f' },
        plain:
          'A green check is going, a gray question mark maybe, and an empty ring no answer yet: shape and color, never color alone.',
      },
      {
        kind: 'appearance',
        term: 'Tally',
        value: '“4 yes, 1 maybe, 1 awaiting”',
        plain: 'The count sits above the names, so you know whether everyone is coming before reading them.',
      },
      {
        kind: 'appearance',
        term: 'Roles',
        value: '“Organizer” · “(you)”',
        plain: 'Jonas set the meeting up, and your own row is marked so you can find it.',
      },
    ],
  },
  {
    id: 'rsvp-control',
    name: 'RSVP control',
    htmlTag: '<div role="radiogroup">',
    variant: 'Going? Yes · No · Maybe',
    summary:
      'Your answer to the invitation. Changing it tells the organizer and changes how the event looks in your week.',
    aliases: ['going?', 'accept or decline', 'RSVP buttons', 'response'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Segmented control',
        value: { light: 'background: #f0f0ee · selected: #ffffff', dark: 'background: #2a2a2a · selected: #2c2c2c' },
        plain: 'Three answers in one gray track; yours is the raised one, in iris.',
      },
      {
        kind: 'behavior',
        term: 'role="radio"',
        value: 'aria-checked="true"',
        plain: 'Only one answer can be chosen, and screen readers hear it as a choice of three.',
      },
      {
        kind: 'behavior',
        term: 'Changes the event',
        value: 'Maybe → striped',
        plain: 'Answering Maybe would stripe this event like Thursday’s offsite planning.',
      },
    ],
  },
];
