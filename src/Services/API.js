// import {API_KEY, BASE_URL} from '@env';
import {useState, useEffect} from 'react';

export const GET = async url => {
  let response = await fetch(
    `https://api.themoviedb.org/3${url}?api_key=${process.env.API_KEY}`,
    {method: 'GET'},
  );
  response = response?.json();

  return response;
};

const useApiGetDiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [isMovieFetching, setIsMovieFetching] = useState(false);

  useEffect(() => {
    console.log('start fetching', process.env.API_KEY, process.env.BASE_URL);
    setIsMovieFetching(true);
    fetch(
      `${process.env.BASE_URL}/discover/movie?api_key=${process.env.API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
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
        setTimeout(() => {
          setIsMovieFetching(false);
        }, 2000);
      })
      .catch(err => {
        setTimeout(() => {
          setIsMovieFetching(false);
        }, 2000);
        console.log('err', JSON.stringify(err));
      });
  }, []);

  return [movies, images, isMovieFetching];
};

export {useApiGetDiscoverMovies};
