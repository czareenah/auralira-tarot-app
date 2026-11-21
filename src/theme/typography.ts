import { Platform } from 'react-native';

export const typography = {
  display: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }),
  body: Platform.select({ ios: 'System', android: 'sans-serif', default: 'system-ui, sans-serif' }),
} as const;
