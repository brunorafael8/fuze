import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Navigator} from './navigator';
import '../global.css';

const queryClient = new QueryClient();

const App = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <Navigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
