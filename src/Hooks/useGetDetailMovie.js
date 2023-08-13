// @ts-nocheck
import {useEffect, useState} from 'react';
import {GET} from '../Services/API';

const useGetDetailMovie = movieId => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    GET(`/movie/${movieId}`)
      .then(data => {
        setDetails(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [movieId]);

  return [details, loading];
};

export {useGetDetailMovie};
