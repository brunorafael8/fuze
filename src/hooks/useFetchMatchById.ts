import {UseQueryOptions, useQueries} from '@tanstack/react-query';
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

export type MatchOpponentsProps = {
  opponents: {
    id: number;
    image_url: string;
    location: string;
    modified_at: string;
    name: string;
    players: IPlayer[];
  }[];
};

export interface IPlayer {
  active: boolean;
  age: number;
  birthday: string;
  first_name: string;
  id: number;
  image_url: string;
  last_name: string;
  modified_at: string;
  name: string;
  nationality: string;
  slug: string;
}

async function fetchMatchById({id = ''}) {
  const res = await api.get<MatchProps>(`/matches/${id}`, {});
  return res.data;
}

async function fetchMatchOpponentsById({id = ''}) {
  const res = await api.get<MatchOpponentsProps>(
    `/matches/${id}/opponents`,
    {},
  );
  console.log(res, 'res.data');
  return res.data;
}

type TQueries = UseQueryOptions<MatchProps> | UseQueryOptions<MatchProps[o]>;

export function useFetchMatchById(id: string) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['matches', id],
        queryFn: () => fetchMatchById({id}),
      },
      {
        queryKey: ['matches-opponents', id],
        queryFn: () => fetchMatchOpponentsById({id}),
      },
    ],
  });

  const isLoading = results.some(query => query.isLoading);

  return [results, isLoading] as const;
}
