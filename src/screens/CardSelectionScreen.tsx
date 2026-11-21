import { Image, StyleSheet, Text, View } from 'react-native';

import { CelestialBackground } from '@/components/CelestialBackground';
import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';
import { typography } from '@/theme/typography';

const FACE_DOWN_CARD_COUNT = 9;

export function CardSelectionScreen() {
  return (
    <View style={styles.container}>
      <CelestialBackground />
      <Screen>
        <Text style={styles.eyebrow}>AURALIRA</Text>
        <View style={styles.content}>
          <Text style={styles.title}>The cards are waiting</Text>
          <Text style={styles.description}>
            Take a breath and notice which card draws your attention.
          </Text>
          <View style={styles.cardGrid}>
            {Array.from({ length: FACE_DOWN_CARD_COUNT }, (_, index) => (
              <View
                key={index}
                accessible
                accessibilityRole="image"
                accessibilityLabel={`Face-down tarot card ${index + 1}`}
                style={styles.card}
              >
                <View style={styles.cardInner}>
                  <Image
                    source={require('../../assets/brand/auralira-seal-gold-512.png')}
                    resizeMode="contain"
                    accessible={false}
                    style={styles.seal}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.footer}>TRUST THE WISDOM WITHIN</Text>
      </Screen>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  title: {
    color: colors.ivory,
    fontFamily: typography.display,
    fontSize: 29,
    lineHeight: 38,
    textAlign: 'center',
  },
  description: {
    color: colors.ivory,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    maxWidth: 300,
    textAlign: 'center',
  },
  cardGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  card: {
    width: '29%',
    maxWidth: 116,
    aspectRatio: 0.68,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 24, 39, 0.9)',
  },
  cardInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(199, 166, 109, 0.65)',
    borderRadius: 6,
  },
  seal: { width: '72%', height: '72%', opacity: 0.85 },
  footer: {
    color: colors.gold,
    fontFamily: typography.body,
    fontSize: 10,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
