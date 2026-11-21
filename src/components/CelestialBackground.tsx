import { useEffect, useState } from 'react';
import { AccessibilityInfo, Image, StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

import { colors } from '@/theme/tokens';

export function CelestialBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);
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
    <View pointerEvents="none" style={styles.container}>
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
      <View style={styles.scrim} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
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
});
