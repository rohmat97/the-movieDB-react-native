// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {GET} from '../Services/API';

export const useGetPopular = () => {
  const [popular, setPopular] = useState([]);
  const [loadingPopular, setloadingPopular] = useState(true);
  const [refetch, setrefetch] = useState(false);
  const [page, setpage] = useState(1);
  const [prevPage, setprevPage] = useState(1);

  useEffect(() => {
    GET('/movie/popular', page)
      .then(response => {
        setPopular(response);
        setloadingPopular(false);
        setrefetch(false);
      })
      .catch(err => {
        setloadingPopular(false);
        setrefetch(false);
        console.log('err', JSON.stringify(err));
      });
  }, []);

  useEffect(() => {
    if (page !== prevPage) {
      setPopular([]);
      setrefetch(true);
      setprevPage(page);
      GET('/movie/popular', page)
        .then(response => {
          setPopular(response);
          setloadingPopular(false);
          setrefetch(false);
        })
        .catch(err => {
          setloadingPopular(false);
          setrefetch(false);
          console.log('err', JSON.stringify(err));
        });
    }
  }, [page, prevPage]);

  return [popular, loadingPopular, setpage, refetch, setrefetch];
};
