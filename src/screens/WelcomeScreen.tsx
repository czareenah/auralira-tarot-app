import { useEffect, useRef, useState } from 'react';
import { useRouter, type Href } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { CelestialBackground } from '@/components/CelestialBackground';
import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';
import { typography } from '@/theme/typography';

export function WelcomeScreen() {
  const router = useRouter();
  const [isBeginning, setIsBeginning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const beginReading = () => {
    if (transitionTimer.current) return;
    setIsBeginning(true);
    transitionTimer.current = setTimeout(() => {
      router.replace('/cards' as Href);
      transitionTimer.current = null;
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <CelestialBackground />
      {!isBeginning && (
        <Screen>
          <Text style={styles.eyebrow}>TAROT & REFLECTION</Text>
          <View style={styles.welcome}>
            <Image
              source={require('../../assets/brand/auralira-seal-gold-512.png')}
              accessibilityLabel="Auralira celestial tarot seal"
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.brandName}>AURALIRA</Text>
            <View accessible={false} style={styles.rule} />
            <Text style={styles.tagline}>
              Take what resonates. Leave what doesn’t. Make space for what comes next.
            </Text>
            <Text style={styles.description}>
              A quiet moment. An open mind. Your own intuition.
            </Text>
          </View>
          <View style={styles.footerGroup}>
            <Pressable
              accessibilityRole="button"
              accessibilityHint="Begins your reading after a brief pause"
              onPress={beginReading}
              style={({ pressed }) => [styles.beginButton, pressed && styles.beginPressed]}
            >
              <Text style={styles.beginText}>TAP TO BEGIN</Text>
            </Pressable>
            <Text style={styles.footer}>TRUST THE WISDOM WITHIN</Text>
          </View>
        </Screen>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.midnight },
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
  logo: {
    width: 160,
    height: 160,
  },
  brandName: {
    color: colors.gold,
    fontFamily: typography.display,
    fontSize: 25,
    letterSpacing: 2,
    marginTop: spacing.xs,
    textAlign: 'center',
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
  footerGroup: { alignItems: 'center' },
  beginButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  beginPressed: { opacity: 0.65 },
  beginText: {
    color: colors.ivory,
    fontFamily: typography.body,
    fontSize: 15,
    letterSpacing: 1,
  },
  footer: {
    color: colors.gold,
    fontFamily: typography.body,
    fontSize: 10,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
