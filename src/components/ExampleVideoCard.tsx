import { useState } from 'react';
import { Platform, Text, View, useWindowDimensions } from 'react-native';
import { useEventListener } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

type Props = {
  title: string;
  uri: string;
};

export function ExampleVideoCard({ title, uri }: Props) {
  const { width } = useWindowDimensions();
  const videoWidth = Math.max(0, width - 40);
  const height = 220;
  const [error, setError] = useState<string | null>(null);

  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
    p.muted = false;
    p.volume = 1;
  });

  useEventListener(player, 'statusChange', ({ status, error: err }) => {
    if (status === 'error' && err) {
      setError(err.message);
    } else if (status !== 'error') {
      setError(null);
    }
  });

  return (
    <View className="rounded-2xl border border-slate-800 bg-black">
      <View className="rounded-t-2xl border-b border-slate-800 bg-slate-900 px-3 py-2">
        <Text className="text-xs font-semibold text-slate-300">{title}</Text>
      </View>
      <View
        collapsable={false}
        style={{
          width: videoWidth,
          height,
          alignSelf: 'center',
          backgroundColor: '#000',
        }}
        {...(Platform.OS === 'android' ? { renderToHardwareTextureAndroid: true } : {})}
      >
        <VideoView
          player={player}
          style={{ width: videoWidth, height }}
          nativeControls
          contentFit="contain"
          fullscreenOptions={{ enable: true }}
          {...(Platform.OS === 'android' ? { surfaceType: 'textureView' as const } : {})}
        />
      </View>
      {error ? (
        <Text className="border-t border-slate-800 bg-rose-950/40 px-3 py-2 text-xs text-rose-300">
          Could not load video: {error}
        </Text>
      ) : null}
    </View>
  );
}
