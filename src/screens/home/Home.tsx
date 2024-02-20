import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View
} from 'react-native';

export default function Home({
  navigation,
}: {
  navigation: NavigationContainerRef<any>;
}) {
  return (
    <SafeAreaView className='bg-[#161621] flex-1'>
      <StatusBar barStyle="light-content" />
      <View className="p-[24px]">
        <Text className="font-medium text-[32px] leading-[40px] text-white font-roboto">Partidas</Text>
      </View>
    </SafeAreaView>
  );
}
