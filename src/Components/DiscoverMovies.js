import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Constants from '../Constants';
import {useApiGetDiscoverMovies} from '../Services/API';
const DiscoverMovies = props => {
  const [movies, images, isMovieFetching] = useApiGetDiscoverMovies();
  if (isMovieFetching) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View>
      <SliderBox
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
