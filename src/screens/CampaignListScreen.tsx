import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CAMPAIGNS } from '../data/campaigns';
import { useSubmissions } from '../context/SubmissionsContext';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

function formatMoney(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export function CampaignListScreen() {
  const navigation = useNavigation<Nav>();
  const { getLatestForCampaign } = useSubmissions();

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={['top', 'left', 'right']}>
      <View className="border-b border-slate-800 px-5 pb-4 pt-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Creator
            </Text>
            <Text className="mt-1 text-2xl font-bold text-white">Active campaigns</Text>
            <Text className="mt-1 text-sm text-slate-400">Pick a brief, ship a post, track review.</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('MySubmissions')}
            className="rounded-xl bg-slate-800 px-3 py-2 active:opacity-80"
          >
            <Text className="text-xs font-semibold text-indigo-200">My subs</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={CAMPAIGNS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => {
          const latest = getLatestForCampaign(item.id);
          return (
            <Pressable
              onPress={() => navigation.navigate('CampaignDetail', { campaignId: item.id })}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-4 active:border-indigo-500/60"
            >
              <View className="flex-row items-start justify-between gap-3">
                <View className="min-w-0 flex-1">
                  <Text className="text-lg font-bold text-white">{item.brand}</Text>
                  <Text className="mt-0.5 text-sm text-slate-400" numberOfLines={2}>
                    {item.tagline}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-semibold text-emerald-400">{formatMoney(item.payoutUsd)}</Text>
                  <Text className="text-[10px] font-medium uppercase tracking-wide text-slate-500">per video</Text>
                </View>
              </View>
              <View className="mt-3 flex-row items-center justify-between border-t border-slate-800/80 pt-3">
                <Text className="text-xs text-slate-500">
                  Deadline <Text className="font-semibold text-slate-300">{item.deadlineLabel}</Text>
                </Text>
                {latest ? (
                  <View
                    className={`rounded-full px-2 py-0.5 ${
                      latest.status === 'approved'
                        ? 'bg-emerald-500/15'
                        : latest.status === 'rejected'
                          ? 'bg-rose-500/15'
                          : 'bg-amber-500/15'
                    }`}
                  >
                    <Text
                      className={`text-[10px] font-bold uppercase tracking-wide ${
                        latest.status === 'approved'
                          ? 'text-emerald-300'
                          : latest.status === 'rejected'
                            ? 'text-rose-300'
                            : 'text-amber-200'
                      }`}
                    >
                      {latest.status}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                    Not started
                  </Text>
                )}
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
