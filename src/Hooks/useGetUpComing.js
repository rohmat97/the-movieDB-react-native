// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {GET} from '../Services/API';

export const useGetUpComing = () => {
  const [upComing, setUpComing] = useState([]);
  const [loadingUpComing, setloadingUpComing] = useState(true);
  const [refetch, setrefetch] = useState(false);
  const [page, setpage] = useState(1);
  const [prevPage, setprevPage] = useState(1);

  useEffect(() => {
    GET('/movie/upcoming', page)
      .then(response => {
        // console.log('useGetUpComing', response);
        setUpComing(response);
        setloadingUpComing(false);
        setrefetch(false);
      })
      .catch(err => {
        setloadingUpComing(false);
        setrefetch(false);
        console.log('err', JSON.stringify(err));
      });
  }, []);

  useEffect(() => {
    if (page !== prevPage) {
      setUpComing([]);
      setrefetch(true);
      setprevPage(page);
      GET('/movie/upcoming', page)
        .then(response => {
          console.log('response', response);
          setUpComing(response);
          setloadingUpComing(false);
          setrefetch(false);
        })
        .catch(err => {
          setloadingUpComing(false);
          setrefetch(false);
          console.log('err', JSON.stringify(err));
        });
    }
  }, [page, prevPage]);

  return [upComing, loadingUpComing, setpage, refetch, setrefetch];
};
