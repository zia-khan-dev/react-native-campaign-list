import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CampaignListScreen } from '../screens/CampaignListScreen';
import { CampaignDetailScreen } from '../screens/CampaignDetailScreen';
import { MySubmissionsScreen } from '../screens/MySubmissionsScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#020617',
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="CampaignList" component={CampaignListScreen} />
        <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
        <Stack.Screen name="MySubmissions" component={MySubmissionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
