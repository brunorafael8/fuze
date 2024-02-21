import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useFetchMatches} from '../../hooks';
import {MatchProps} from '../../hooks/useFetchMatches';

export default function Home({
  navigation,
}: {
  navigation: NavigationContainerRef<any>;
}) {
  const {
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  } = useFetchMatches();

  const loadMore = () => {
    console.log('wduhwhu', hasNextPage)
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  console.log({data: data?.pages.map(i => i)}, {isLoading});
  return (
    <SafeAreaView className="bg-[#161621] flex-1">
      <StatusBar barStyle="light-content" />
      <View className="p-[24px] flex-1 h-full">
        <Text className="font-medium text-[32px] leading-[40px] text-white font-roboto">
          Partidas
        </Text>
        {/* {isLoading ? (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : ( */}
          <FlatList
            data={data?.pages.map(i => i).flat() || []}
            keyExtractor={item => item.serie_id}
            className="flex-1"
            renderItem={({item}: {item: MatchProps}) => (
              <View className="bg-[#272639] w-full h-[176px] mt-[24px] rounded-[16px]">
                {item.status === 'running' ? (
                  <View className="bg-red">
                    <Text className="text-white font-roboto text-[12px]">
                      {item.begin_at}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text className="text-white font-roboto text-[12px]">
                      {item.begin_at}
                    </Text>
                  </View>
                )}
                <View className="items-center justify-center flex-row">
                  <View>
                   {item.opponents[0].opponent.image_url ?  <Image
                      source={{uri: item.opponents[0].opponent.image_url}}
                    
                      className='w-[60px] h-[60px] '
                    /> : <View className='w-[60px] h-[60px] rounded-full bg-[#C4C4C4]' />  }
                    <Text className="text-white font-roboto text-[10px]">
                      {item.opponents[0].opponent.name}
                    </Text>
                  </View>
                  <Text className="text-uppercase font-roboto text-[12px] text-[#ffffff80] px-[20px]">
                    vs
                  </Text>
                  <View>
                    <Image
                      source={{uri: item.opponents[1].opponent.image_url || ''}}
                      style={{width: 60, height: 60}}
                    />
                    <Text className="text-white font-roboto text-[10px]">
                      {item.opponents[1].opponent.name}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="text-white font-roboto text-[24px]">
                    {item.league.name}
                  </Text>
                </View>
              </View>
            )}
            onRefresh={() => refetch()}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={refetch}
                tintColor="#fff"
              />
            }
            refreshing={isFetching}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={() => (
              <View className="items-center justify-center h-full">
                <Text className="text-white font-roboto text-[24px]">
                  Não há partidas
                </Text>
              </View>
            )}
            ListFooterComponent={() =>
              isFetchingNextPage && (
                <ActivityIndicator size="large" color="#fff" />
              )
            }
          />
        // )}
      </View>
    </SafeAreaView>
  );
}
