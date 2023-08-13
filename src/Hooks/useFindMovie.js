// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {GET} from '../Services/API';

export const useFindMovie = () => {
  const [findMovie, setFindMovie] = useState([]);
  const [query, setquery] = useState('');
  const [loadingFindMovie, setloadingFindMovie] = useState(true);
  const [refetch, setrefetch] = useState(false);
  const [page, setpage] = useState(1);
  const [prevPage, setprevPage] = useState(1);

  useEffect(() => {
    GET(`/search/movie`, page, `query=${query}`)
      .then(response => {
        console.log('response', response);
        setFindMovie(response);
        setloadingFindMovie(false);
        setrefetch(false);
      })
      .catch(err => {
        setloadingFindMovie(false);
        setrefetch(false);
        console.log('err', JSON.stringify(err));
      });
  }, [query]);

  useEffect(() => {
    if (page !== prevPage) {
      setFindMovie([]);
      setrefetch(true);
      setprevPage(page);
      GET(`/search/movie`, page, `query=${query}`)
        .then(response => {
          setFindMovie(response);
          setloadingFindMovie(false);
          setrefetch(false);
        })
        .catch(err => {
          setloadingFindMovie(false);
          setrefetch(false);
          console.log('err', JSON.stringify(err));
        });
    }
  }, [page, prevPage]);

  return [findMovie, loadingFindMovie, setpage, refetch, setrefetch, setquery];
};
