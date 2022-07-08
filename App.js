import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  HindMadurai_300Light,
  HindMadurai_400Regular,
  HindMadurai_500Medium,
  HindMadurai_600SemiBold,
  HindMadurai_700Bold,
} from '@expo-google-fonts/hind-madurai';

import { Tabs } from './src/tabs/Tabs';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    HindMadurai_300Light,
    HindMadurai_400Regular,
    HindMadurai_500Medium,
    HindMadurai_600SemiBold,
    HindMadurai_700Bold,
  });
  if (!fontsLoaded) return <AppLoading />;
    return(
        <NavigationContainer>
          <Tabs/>
        </NavigationContainer>
    );
};
