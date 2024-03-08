import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';
import {MatchProps} from '../../../../hooks/useFetchMatches';
moment.locale('pt-br');

interface Props {
  item: MatchProps;
}

export default function MatchItem(props: Props) {
  const {item} = props;

  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      className="bg-[#272639] w-full h-auto mt-[24px] rounded-[16px]"
      onPress={() => {
        navigation.navigate('match-details', {itemId: item.id} as never);
      }}>
      {item.status === 'running' ? (
        <View className="bg-red rounded-s-sm">
          <Text className="text-white font-roboto text-[12px]">Agora</Text>
        </View>
      ) : (
        <View className="rounded-tr-[16px] rounded-bl-[16px] bg-[#515060] w-fit self-end p-[8px]">
          <Text className="text-white font-roboto text-[12px]">
            {moment(item.begin_at).format('dddd, h:mm')}
          </Text>
        </View>
      )}
      <View className="items-center justify-center flex-row mt-[18.5px]">
        <View className="items-center">
          {item.opponents[0]?.opponent.image_url ? (
            <Image
              source={{uri: item.opponents[0].opponent.image_url}}
              className="w-[60px] h-[60px] "
            />
          ) : (
            <View className="w-[60px] h-[60px] rounded-full bg-[#C4C4C4]" />
          )}
          <Text className="text-white font-roboto text-[10px] mt-[10px]">
            {item.opponents[0]?.opponent.name || 'teste'}
          </Text>
        </View>
        <Text className="text-uppercase font-roboto text-[12px] text-[#ffffff80] px-[20px]">
          vs
        </Text>
        <View className="items-center">
          {item.opponents[1]?.opponent.image_url ? (
            <Image
              source={{
                uri: item.opponents[1].opponent.image_url || '',
              }}
              style={{width: 60, height: 60}}
            />
          ) : (
            <View className="w-[60px] h-[60px] rounded-full bg-[#C4C4C4]" />
          )}
          <Text className="text-white font-roboto text-[10px] mt-[10px]">
            {item.opponents[1]?.opponent.name || 'teste'}
          </Text>
        </View>
      </View>
      <View className="w-full bg-[#C4C4C4] h-[1px] mt-[18.5px]" />
      <View className="flex-row pl-[16px] items-center py-[8px]">
        <View className="w-[16px] h-[16px] rounded-full bg-[#C4C4C4]" />
        <Text className="text-white font-roboto text-[8px] ml-[8px]">
          {item.league.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
