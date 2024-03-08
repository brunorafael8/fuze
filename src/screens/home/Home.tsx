import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useFetchMatches} from '../../hooks';
import {MatchProps} from '../../hooks/useFetchMatches';
import {MatchItem} from './partials';

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
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="bg-[#161621] flex-1">
      <StatusBar barStyle="light-content" />
      <View className="p-[24px] flex-1 h-full">
        <Text className="font-medium text-[32px] leading-[40px] text-white font-roboto">
          Partidas
        </Text>
        {isLoading ? (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <FlatList
            data={data?.pages.map(i => i).flat() || []}
            keyExtractor={item => item.id.toString()}
            className="flex-1"
            renderItem={({item}: {item: MatchProps}) => (
              <MatchItem item={item} />
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
            onEndReachedThreshold={0.5}
            ListEmptyComponent={() => (
              <View className="items-center justify-center h-full">
                <Text className="text-white font-roboto text-[24px]">
                  Não há partidas
                </Text>
              </View>
            )}
            ListFooterComponent={() =>
              isFetchingNextPage && (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  className="mt-[16px]"
                />
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
