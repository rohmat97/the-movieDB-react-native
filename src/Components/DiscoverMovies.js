// @ts-nocheck
import {useApiGetDiscoverMovies} from '@hooks/useApiGetDiscoverMovies';
import {View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Constants from '../Constants';
import Loader from './Loader';
import React from 'react';

const DiscoverMovies = props => {
  const [movies, images, isMovieFetching] = useApiGetDiscoverMovies();
  if (isMovieFetching) {
    return <Loader />;
  }
  return (
    <View>
      <SliderBox
        autoplay
        autoplayInterval={5000}
        images={images}
        dotColor={Constants.secondaryColor}
        onCurrentImagePressed={index =>
          movies &&
          props.navigation.navigate('movieDetails', {
            movieId: movies[index].id,
          })
        }
      />
    </View>
  );
};

export default DiscoverMovies;
