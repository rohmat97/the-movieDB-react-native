// @ts-nocheck

import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Styles from '../Styles';
import Loader from './Loader';
import React from 'react';
import {useGetTrendingMovies} from '../hooks/useGetTrendingMovies';
const TrendingMovies = props => {
  const [movies, loading] = useGetTrendingMovies();

  if (loading) {
    return (
      <View>
        <Loader />
      </View>
    );
  }
  return (
    <View>
      <Text style={Styles.heading}>{props.title}</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={movies}
        horizontal
        renderItem={item => displayMovies(item, props)}
      />
    </View>
  );
};

const displayMovies = ({item}, props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.push('movie-details', {movieId: item.id});
      }}
      style={{marginHorizontal: 10}}>
      <Image
        source={{uri: `${process.env.POSTER_IMAGE}${item.poster_path}`}}
        style={Styles.posterImage}
      />
      <Text style={Styles.movieTitle}>{item.original_title}</Text>
    </TouchableOpacity>
  );
};

export default TrendingMovies;
