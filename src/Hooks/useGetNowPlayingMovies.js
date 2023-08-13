// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {GET} from '../Services/API';

export const useGetNowPlayingMovies = () => {
  const [nowPlaying, setnowPlaying] = useState([]);
  const [loadingNowPlaying, setloadingNowPlaying] = useState(true);
  const [refetch, setrefetch] = useState(false);
  const [page, setpage] = useState(1);
  const [prevPage, setprevPage] = useState(1);

  useEffect(() => {
    GET('/movie/now_playing', page)
      .then(response => {
        setnowPlaying(response);
        setloadingNowPlaying(false);
        setrefetch(false);
      })
      .catch(err => {
        setloadingNowPlaying(false);
        setrefetch(false);
        console.log('err', JSON.stringify(err));
      });
  }, []);

  useEffect(() => {
    if (page !== prevPage) {
      setnowPlaying([]);
      setrefetch(true);
      setprevPage(page);
      GET('/movie/now_playing', page)
        .then(response => {
          console.log('response', response);
          setnowPlaying(response);
          setloadingNowPlaying(false);
          setrefetch(false);
        })
        .catch(err => {
          setloadingNowPlaying(false);
          setrefetch(false);
          console.log('err', JSON.stringify(err));
        });
    }
  }, [page]);

  return [nowPlaying, loadingNowPlaying, setpage, refetch, setrefetch];
};
