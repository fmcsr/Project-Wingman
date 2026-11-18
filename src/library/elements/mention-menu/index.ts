import type { LibraryExample } from '../../types';
import { MentionMenu } from './MentionMenu';
import { mentionMenuSpecs } from './specs';

export const mentionMenu: LibraryExample = {
  id: 'mention-menu',
  platform: 'elements',
  name: 'Mention menu',
  kind: 'Autocomplete',
  category: 'Productivity',
  size: 'small',
  inspiredBy: ['Slack', 'Linear', 'Notion'],
  description:
    'Typing @ in a message opens a list of people that narrows as you type; the highlighted one goes in as a mention chip.',
  Component: MentionMenu,
  specs: mentionMenuSpecs,
};
