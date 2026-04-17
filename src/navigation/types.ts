import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  CampaignList: undefined;
  CampaignDetail: { campaignId: string };
  MySubmissions: undefined;
};

export type CampaignListScreenProps = NativeStackScreenProps<RootStackParamList, 'CampaignList'>;
export type CampaignDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CampaignDetail'
>;
export type MySubmissionsScreenProps = NativeStackScreenProps<RootStackParamList, 'MySubmissions'>;
