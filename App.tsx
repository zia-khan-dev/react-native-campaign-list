import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SubmissionsProvider } from './src/context/SubmissionsContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SubmissionsProvider>
      <RootNavigator />
      <StatusBar style="light" />
    </SubmissionsProvider>
  );
}
