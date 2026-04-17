import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { MySubmissionsScreenProps } from '../navigation/types';
import { CAMPAIGNS, getCampaignById } from '../data/campaigns';
import { useSubmissions } from '../context/SubmissionsContext';

function statusStyle(status: 'pending' | 'approved' | 'rejected') {
  if (status === 'approved') return { wrap: 'bg-emerald-500/15', text: 'text-emerald-300' };
  if (status === 'rejected') return { wrap: 'bg-rose-500/15', text: 'text-rose-300' };
  return { wrap: 'bg-amber-500/15', text: 'text-amber-200' };
}

export function MySubmissionsScreen({ navigation }: MySubmissionsScreenProps) {
  const { submissions } = useSubmissions();

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={['top', 'left', 'right']}>
      <View className="border-b border-slate-800 px-5 pb-4 pt-2">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} className="self-start py-1">
          <Text className="text-sm font-semibold text-indigo-400">← Back</Text>
        </Pressable>
        <Text className="mt-2 text-2xl font-bold text-white">My submissions</Text>
        <Text className="mt-1 text-sm text-slate-400">Newest first. Mock reviewer resolves after a short delay.</Text>
      </View>

      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="mx-5 mt-10 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6">
            <Text className="text-center text-base text-slate-300">No submissions yet.</Text>
            <Text className="mt-2 text-center text-sm text-slate-500">
              Open a campaign, watch the examples, then paste your TikTok or Instagram URL.
            </Text>
            <Pressable
              onPress={() => navigation.navigate('CampaignList')}
              className="mt-5 self-center rounded-xl bg-indigo-600 px-4 py-3"
            >
              <Text className="font-semibold text-white">Browse campaigns</Text>
            </Pressable>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => {
          const c = getCampaignById(item.campaignId);
          const st = statusStyle(item.status);
          return (
            <Pressable
              onPress={() => navigation.navigate('CampaignDetail', { campaignId: item.campaignId })}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 active:border-indigo-500/50"
            >
              <Text className="text-xs font-bold uppercase tracking-widest text-slate-500">Campaign</Text>
              <Text className="mt-1 text-lg font-bold text-white">{c?.brand ?? 'Unknown campaign'}</Text>
              <View className={`mt-3 self-start rounded-full px-2.5 py-1 ${st.wrap}`}>
                <Text className={`text-[11px] font-bold uppercase tracking-wide ${st.text}`}>{item.status}</Text>
              </View>
              <Text className="mt-3 text-xs text-slate-500">Video URL</Text>
              <Text selectable numberOfLines={2} className="text-sm text-indigo-200">
                {item.videoUrl}
              </Text>
              <Text className="mt-2 text-[11px] text-slate-600">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </Pressable>
          );
        }}
      />

      <View className="border-t border-slate-800 px-5 py-3">
        <Text className="text-center text-[11px] text-slate-600">
          {CAMPAIGNS.length} live briefs · data is local mock only
        </Text>
      </View>
    </SafeAreaView>
  );
}
