import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, MatchDetails} from '../screens';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="match-details" component={MatchDetails} />
      </Stack.Navigator>
    </>
  );
}
