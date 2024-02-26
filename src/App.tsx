import React, { useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';
import '../global.css';
import { Navigator } from './navigator';

const queryClient = new QueryClient();

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <Navigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
