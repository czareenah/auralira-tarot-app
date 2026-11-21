import { useEffect, useState } from 'react';
import { AccessibilityInfo, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';
import { typography } from '@/theme/typography';

export function WelcomeScreen() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hasTappedBegin, setHasTappedBegin] = useState(false);
  const player = useVideoPlayer(
    require('../../assets/welcome/auralira-welcome-loop-portrait.mp4'),
    videoPlayer => {
      videoPlayer.loop = true;
      videoPlayer.muted = true;
      videoPlayer.play();
    },
  );

  useEffect(() => {
    let isActive = true;
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      if (isActive) setReduceMotion(enabled);
    });

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    );

    return () => {
      isActive = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      player.pause();
      return;
    }
    player.play();
  }, [player, reduceMotion]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/welcome/auralira-welcome-poster.png')}
        resizeMode="cover"
        accessible={false}
        style={styles.background}
      />
      {!reduceMotion && (
        <VideoView
          player={player}
          style={styles.background}
          contentFit="cover"
          nativeControls={false}
          allowsPictureInPicture={false}
          accessible={false}
        />
      )}
      <View pointerEvents="none" style={styles.scrim} />
      <Screen>
        <Text style={styles.eyebrow}>TAROT & REFLECTION</Text>
        <View style={styles.welcome}>
          <Image
            source={require('../../assets/brand/auralira-seal-gold-512.png')}
            accessibilityLabel="Auralira celestial tarot seal"
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.brandName}>Auralira</Text>
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
            accessibilityHint="Opens the tarot reading experience"
            onPress={() => setHasTappedBegin(true)}
            style={({ pressed }) => [styles.beginButton, pressed && styles.beginPressed]}
          >
            <Text style={styles.beginText}>Tap to Begin</Text>
          </Pressable>
          {hasTappedBegin && (
            <Text accessibilityLiveRegion="polite" style={styles.beginHint}>
              Your reading awaits.
            </Text>
          )}
          <Text style={styles.footer}>TRUST THE WISDOM WITHIN</Text>
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.midnight },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(16, 24, 39, 0.28)',
  },
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
  beginHint: {
    color: colors.ivory,
    fontFamily: typography.body,
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  footer: {
    color: colors.gold,
    fontFamily: typography.body,
    fontSize: 10,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
