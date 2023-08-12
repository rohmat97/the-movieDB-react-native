// @ts-nocheck
import {GET} from '@Services/API';
import React, {useEffect, useState} from 'react';

export const useGetTrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GET('/movie/top_rated')
      .then(data => {
        setMovies(data.results || []);
        setTimeout(() => {
          setLoading(false);
        }, 250);
      })
      .catch(() =>
        setTimeout(() => {
          setLoading(false);
        }, 250),
      );
  }, []);

  return [movies, loading];
};
