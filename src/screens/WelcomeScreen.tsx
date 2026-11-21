import { StyleSheet, Text, View } from 'react-native';

import { BrandWordmark } from '@/components/BrandWordmark';
import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';
import { typography } from '@/theme/typography';

export function WelcomeScreen() {
  return (
    <Screen>
      <Text style={styles.eyebrow}>TAROT & REFLECTION</Text>
      <View style={styles.welcome}>
        <Text style={styles.introduction}>WELCOME TO</Text>
        <BrandWordmark />
        <View accessible={false} style={styles.rule} />
        <Text style={styles.tagline}>Make space for what comes next.</Text>
        <Text style={styles.description}>
          A quiet moment. An open mind. Your own intuition.
        </Text>
      </View>
      <Text style={styles.footer}>PAUSE. BREATHE. BE HERE.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: colors.gold,
    fontFamily: typography.body,
    fontSize: 11,
    letterSpacing: 3,
    textAlign: 'center',
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  introduction: {
    color: colors.gold,
    fontFamily: typography.body,
    fontSize: 10,
    letterSpacing: 3,
    marginBottom: spacing.sm,
  },
  rule: {
    width: 48,
    height: 1,
    backgroundColor: colors.gold,
    marginVertical: spacing.lg,
  },
  tagline: {
    color: colors.ivory,
    fontFamily: typography.display,
    fontSize: 26,
    lineHeight: 36,
    textAlign: 'center',
  },
  description: {
    color: colors.ivory,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  footer: {
    color: colors.gold,
    fontFamily: typography.body,
    fontSize: 10,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
