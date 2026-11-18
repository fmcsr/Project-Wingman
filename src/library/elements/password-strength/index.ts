import type { LibraryExample } from '../../types';
import { PasswordStrength } from './PasswordStrength';
import { passwordStrengthSpecs } from './specs';

export const passwordStrength: LibraryExample = {
  id: 'password-strength',
  platform: 'elements',
  name: 'Password strength meter',
  kind: 'Sign-up',
  category: 'Forms',
  size: 'small',
  inspiredBy: ['Dropbox', '1Password', 'Stripe'],
  description:
    'A new password typed as dots: a four-segment meter steps from red to green as each rule is met, the checklist ticks, and the eye shows the text for a moment.',
  Component: PasswordStrength,
  specs: passwordStrengthSpecs,
};
