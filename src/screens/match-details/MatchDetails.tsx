import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import ViewOverflow from 'react-native-view-overflow';
import 'moment/locale/pt-br';
import {useFetchMatchById} from '../../hooks';
import ArrowLeft from '../../assets/images/ic-arrow-left.svg';
import {IPlayer} from '../../hooks/useFetchMatchById';
moment.locale('pt-br');

export default function Home({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationContainerRef<any>;
}) {
  const {itemId} = route.params;

  const [results, isLoading] = useFetchMatchById(itemId);

  console.log(results[1], 'results< ');
  return (
    <SafeAreaView className="bg-[#161621] flex-1">
      <StatusBar barStyle="light-content" />
      <View className="py-[24px] flex-1 h-full">
        {isLoading && results ? (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <View className="flex-1 w-full items-center">
            <View className="flex-row justify-center relative px-[24px]">
              <TouchableOpacity
                className="left-[24px] absolute top-0"
                onPress={() => navigation.navigate('home')}>
                <ArrowLeft />
              </TouchableOpacity>
              <Text className="font-medium text-[18px] leading-[24px] text-white font-roboto">
                {results[0].data?.league.name} + {results[0].data?.serie.name}
              </Text>
            </View>
            <View className="items-center justify-center flex-row mt-[24px]">
              <View className="items-center">
                {results[0].data?.opponents[0]?.opponent.image_url ? (
                  <Image
                    source={{
                      uri: results[0].data?.opponents[0].opponent.image_url,
                    }}
                    className="w-[60px] h-[60px] "
                  />
                ) : (
                  <View className="w-[60px] h-[60px] rounded-full bg-[#C4C4C4]" />
                )}
                <Text className="text-white font-roboto text-[10px] mt-[10px]">
                  {results[0].data?.opponents[0]?.opponent.name || 'teste'}
                </Text>
              </View>
              <Text className="text-uppercase font-roboto text-[12px] text-[#ffffff80] px-[20px]">
                vs
              </Text>
              <View className="items-center">
                {results[0].data?.opponents[1]?.opponent.image_url ? (
                  <Image
                    source={{
                      uri:
                        results[0].data?.opponents[1]?.opponent.image_url || '',
                    }}
                    style={{width: 60, height: 60}}
                  />
                ) : (
                  <View className="w-[60px] h-[60px] rounded-full bg-[#C4C4C4]" />
                )}
                <Text className="text-white font-roboto text-[10px] mt-[10px]">
                  {results[0].data?.opponents[1]?.opponent.name || 'teste'}
                </Text>
              </View>
            </View>
            <Text className="text-white font-roboto text-[12px]self-center mt-[20px] font-bold">
              {moment(results[0].data?.begin_at).format('dddd, h:mm')}
            </Text>
            <View className="flex-row">
              <FlatList
                data={results[1].data?.opponents[0]?.players}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}: {item: IPlayer}) => (
                  <ViewOverflow className="flex-row w-1/2 bg-[#272639] rounded-[16px] pl-[8px] pt-[15px] pb-[8px] pr-[11px] mb-[16px] relative">
                        <View className="absolute min-h-[48px] z-[100] top-[-18px] right-0" style={{elevation: 100, zIndex: 100}}>
                        <Image
                          source={{uri: item.image_url}}
                          resizeMode="contain"
                          className="w-[60px] h-[60px]"
                        />
                      </View>
                    <View className="items-end w-[60%]">
                      <Text className="text-white">{item.name}</Text>
                      <Text className="text-[#6C6B7E]">
                        {item.first_name} {item.last_name}
                      </Text>
                    </View>
                    {item.image_url ? (
                      <View className="absolute min-h-[48px] z-[100] top-[-18px] right-0" style={{elevation: 100, zIndex: 100}}>
                        <Image
                          source={{uri: item.image_url}}
                          resizeMode="contain"
                          className="w-[60px] h-[60px]"
                        />
                      </View>
                    ) : (
                      <View className="w-[60px] h-[60px] rounded-full bg-[#C4C4C4]" />
                    )}
                  </ViewOverflow>
                )}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
