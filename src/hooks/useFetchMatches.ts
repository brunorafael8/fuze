import {useInfiniteQuery} from '@tanstack/react-query';
import api from '../services/api';

export type MatchProps = {
  id: string;
  begin_at: string;
  league_id: number;
  status: 'canceled' | 'finished' | 'not_started' | 'postponed' | 'running';
  league: {
    name: string;
    image_url: string | null;
  };
  serie_id: number;
  serie: {
    name: string;
  };
  opponents: {
    opponent: {
      id: number;
      name: string;
      image_url: string | null;
    };
  }[];
};

async function fetchMatches({pageSize = 10}) {
  const res = await api.get(`/csgo/matches?page[size]=${pageSize}`, {});

  return res.data;
}

export function useFetchMatches() {
  return useInfiniteQuery({
    queryKey: ['matches'],
    queryFn: ({pageParam}) => fetchMatches({pageSize: pageParam}),
    initialPageParam: 10,
    getNextPageParam: lastPage => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPage.length + 1;
    },
    getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
  });
}
