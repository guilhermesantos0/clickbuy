import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';
import { UserProvider } from '@/contexts/UserContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="cadastro"
            options={{
              headerTitle: 'Cadastro',
              headerStyle: { backgroundColor: '#DDA04B' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="editAccount"
            options={{
              headerTitle: 'Minha Conta',
              headerStyle: { backgroundColor: '#DDA04B' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="myProducts"
            options={{
              headerTitle: 'Meus Produtos',
              headerStyle: { backgroundColor: '#DDA04B' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="addProduct"
            options={{
              headerTitle: 'Meus Produtos',
              headerStyle: { backgroundColor: '#DDA04B' },
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Toast/>
      </ThemeProvider>
    </UserProvider>
  );
}
