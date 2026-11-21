import { StyleSheet, Text } from 'react-native';

import { colors } from '@/theme/tokens';
import { typography } from '@/theme/typography';

// A typographic placeholder until the final visual identity is approved.
export function BrandWordmark() {
  return <Text accessibilityRole="header" style={styles.wordmark}>Auralira</Text>;
}

const styles = StyleSheet.create({
  wordmark: {
    color: colors.ivory,
    fontFamily: typography.display,
    fontSize: 56,
    letterSpacing: 3,
    textAlign: 'center',
  },
});
