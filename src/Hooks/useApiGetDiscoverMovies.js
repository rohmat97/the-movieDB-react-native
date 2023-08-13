// @ts-nocheck
import {useState, useEffect} from 'react';
import {GET} from '../Services/API';

const useApiGetDiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [isMovieFetching, setIsMovieFetching] = useState(false);

  useEffect(() => {
    setIsMovieFetching(true);
    GET('/discover/movie')
      .then(async response => {
        // console.log('response', response);
        setMovies(response?.results);
        const images = await response.results.map(
          data => `${process.env.IMAGE_POSTER_URL}${data.backdrop_path}`,
        );
        let backImages = [];
        for (let i = 0; i < 10; ++i) {
          backImages = [...backImages, images[i]];
        }

        setImages(backImages);
        setIsMovieFetching(false);
      })
      .catch(err => {
        setIsMovieFetching(false);
        console.log('err', JSON.stringify(err));
      });
  }, []);

  return [movies, images, isMovieFetching];
};

export {useApiGetDiscoverMovies};
