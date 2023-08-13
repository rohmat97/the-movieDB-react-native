// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {GET} from '@Services/API';

export const useGetVideoMovies = movieId => {
  const [video, setvideo] = useState();
  const [loadingVideo, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    GET(`/movie/${movieId}/videos`)
      .then(async response => {
        await response.results?.filter(data => data.official === true);
        setvideo(response?.results[response?.results.length - 1]);
        setTimeout(() => {
          setloading(false);
        }, 2000);
      })
      .catch(err => {
        setTimeout(() => {
          setloading(false);
        }, 2000);
        console.log('err', JSON.stringify(err));
      });
  }, [movieId]);

  return [video, loadingVideo];
};
