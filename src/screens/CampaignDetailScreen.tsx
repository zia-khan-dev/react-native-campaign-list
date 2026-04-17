import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CampaignDetailScreenProps } from '../navigation/types';
import { getCampaignById } from '../data/campaigns';
import { useSubmissions } from '../context/SubmissionsContext';
import { ExampleVideoCard } from '../components/ExampleVideoCard';

function formatMoney(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function isLikelyTikTokOrInstagramUrl(raw: string) {
  const u = raw.trim().toLowerCase();
  if (!u.startsWith('http://') && !u.startsWith('https://')) return false;
  try {
    const host = new URL(u).hostname.replace(/^www\./, '');
    return (
      host.includes('tiktok.com') ||
      host.includes('instagram.com') ||
      host.includes('instagr.am')
    );
  } catch {
    return false;
  }
}

function statusBadge(status: 'pending' | 'approved' | 'rejected') {
  if (status === 'approved') return { label: 'Approved', wrap: 'bg-emerald-500/15', text: 'text-emerald-300' };
  if (status === 'rejected') return { label: 'Rejected', wrap: 'bg-rose-500/15', text: 'text-rose-300' };
  return { label: 'Pending review', wrap: 'bg-amber-500/15', text: 'text-amber-200' };
}

export function CampaignDetailScreen({ route, navigation }: CampaignDetailScreenProps) {
  const { campaignId } = route.params;
  const campaign = useMemo(() => getCampaignById(campaignId), [campaignId]);
  const { getLatestForCampaign, submitUrl } = useSubmissions();
  const latest = campaign ? getLatestForCampaign(campaign.id) : undefined;
  const [url, setUrl] = useState('');

  if (!campaign) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-950">
        <Text className="text-slate-400">Campaign not found.</Text>
        <Pressable onPress={() => navigation.goBack()} className="mt-4 rounded-xl bg-indigo-600 px-4 py-3">
          <Text className="font-semibold text-white">Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const badge = latest ? statusBadge(latest.status) : null;

  const onSubmit = () => {
    if (!isLikelyTikTokOrInstagramUrl(url)) {
      Alert.alert(
        'Check your link',
        'Paste a full TikTok or Instagram URL (https://…). Mock validation only.',
      );
      return;
    }
    submitUrl(campaign.id, url);
    setUrl('');
    Alert.alert('Submitted', 'Your clip is in the queue. Status updates in a few seconds (mock review).');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
      >
        <View className="border-b border-slate-800 px-5 pb-4 pt-2">
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} className="self-start py-1">
            <Text className="text-sm font-semibold text-indigo-400">← Campaigns</Text>
          </Pressable>
          <Text className="mt-2 text-2xl font-bold text-white">{campaign.brand}</Text>
          <Text className="mt-1 text-base text-slate-400">{campaign.tagline}</Text>
          <View className="mt-4 flex-row flex-wrap gap-2">
            <View className="rounded-xl bg-slate-900 px-3 py-2">
              <Text className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Payout</Text>
              <Text className="text-sm font-semibold text-emerald-400">{formatMoney(campaign.payoutUsd)} / video</Text>
            </View>
            <View className="rounded-xl bg-slate-900 px-3 py-2">
              <Text className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Deadline</Text>
              <Text className="text-sm font-semibold text-slate-200">{campaign.deadlineLabel}</Text>
            </View>
            {badge ? (
              <View className={`rounded-xl px-3 py-2 ${badge.wrap}`}>
                <Text className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Your status</Text>
                <Text className={`text-sm font-bold ${badge.text}`}>{badge.label}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View className="gap-6 px-5 pt-6">
          <View>
            <Text className="text-xs font-bold uppercase tracking-widest text-slate-500">Brief</Text>
            <Text className="mt-2 text-base leading-6 text-slate-200">{campaign.brief}</Text>
          </View>

          <View className="flex-row gap-4">
            <View className="min-w-0 flex-1">
              <Text className="text-xs font-bold uppercase tracking-widest text-emerald-500/90">Do</Text>
              {campaign.dos.map((line) => (
                <Text key={line} className="mt-2 text-sm leading-5 text-slate-300">
                  • {line}
                </Text>
              ))}
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-xs font-bold uppercase tracking-widest text-rose-500/90">{"Don't"}</Text>
              {campaign.donts.map((line) => (
                <Text key={line} className="mt-2 text-sm leading-5 text-slate-300">
                  • {line}
                </Text>
              ))}
            </View>
          </View>

          <View>
            <Text className="text-xs font-bold uppercase tracking-widest text-slate-500">Example videos</Text>
            <Text className="mt-1 text-sm text-slate-500">Study pacing, framing, and energy — assets are sample MP4s.</Text>
            <View className="mt-4 gap-5">
              {campaign.exampleVideos.map((ex) => (
                <ExampleVideoCard key={ex.id} title={ex.title} uri={ex.uri} />
              ))}
            </View>
          </View>

          <View className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <Text className="text-xs font-bold uppercase tracking-widest text-indigo-300">Submit post URL</Text>
            <Text className="mt-1 text-sm text-slate-500">TikTok or Instagram public link to your published video.</Text>
            <TextInput
              value={url}
              onChangeText={setUrl}
              placeholder="https://www.tiktok.com/@you/video/…"
              placeholderTextColor="#64748b"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              className="mt-3 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-base text-white"
            />
            <Pressable
              onPress={onSubmit}
              className="mt-3 items-center rounded-xl bg-indigo-600 py-3.5 active:opacity-90"
            >
              <Text className="text-base font-bold text-white">Submit for review</Text>
            </Pressable>
            {latest ? (
              <View className="mt-4 border-t border-slate-800 pt-4">
                <Text className="text-xs font-bold uppercase tracking-widest text-slate-500">Latest submission</Text>
                <Text className="mt-2 text-xs text-slate-500">URL</Text>
                <Text selectable className="text-sm text-indigo-200">
                  {latest.videoUrl}
                </Text>
                <Text className="mt-3 text-xs text-slate-500">Status</Text>
                <Text className={`text-sm font-bold ${statusBadge(latest.status).text}`}>
                  {statusBadge(latest.status).label}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
