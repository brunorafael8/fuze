import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens';

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
      </Stack.Navigator>
    </>
  );
}
