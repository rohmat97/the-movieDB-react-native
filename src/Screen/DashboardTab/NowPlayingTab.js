// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import Loader from '../../Components/Loader';
import Styles, {deviceWidth} from '../../Styles';
import {useGetNowPlayingMovies} from '../../hooks/useGetNowPlayingMovies';
import Header from '../../Components/Header';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';

const NowPlayingScreen = props => {
  const {navigation} = props;
  const [listMovie, setlistMovie] = useState([]);
  const [nowPlaying, loadingNowPlaying, setpage, refetch, setrefetch] =
    useGetNowPlayingMovies();

  const displayMovies = ({item}) => {
    if (!item) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push('movie-details', {movieId: item?.id});
        }}>
        <View style={Styles.containerListMovie}>
          <Image
            source={{uri: `${process.env.POSTER_IMAGE}${item?.poster_path}`}}
            style={Styles.listImage}
            resizeMode="contain"
          />
          <View>
            <Text style={Styles.movieTitle}>{item?.original_title}</Text>
            <Text style={Styles.heading}>VOTES / RATINGS</Text>
            <View
              style={[
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                },
              ]}>
              <View style={{marginLeft: 10}}>
                <StarRatingBar
                  score={item?.vote_average / 2}
                  dontShowScore={true}
                  allowsHalfStars={true}
                  accurateHalfStars={true}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <Text style={Styles.overview}>
                  {item?.vote_average?.toFixed(1)}
                </Text>
                <Text style={Styles.overview}>{item?.vote_count} votes</Text>
              </View>
            </View>
            <Text
              style={[
                Styles.overview,
                {maxWidth: deviceWidth * 0.5 - 8, textAlign: 'left'},
              ]}
              numberOfLines={4}>
              {item?.overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (nowPlaying) {
      setlistMovie(listMovie.concat(nowPlaying?.results));
    }
  }, [nowPlaying]);

  if (loadingNowPlaying) {
    return (
      <View style={Styles.sectionBg}>
        <Loader />
      </View>
    );
  }
  return (
    <View style={Styles.sectionBg}>
      <Header
        title={'Now Playing'}
        Action={() => navigation.navigate('search-movie')}
      />
      {refetch && <Loader />}
      <FlatList
        keyExtractor={item => item?.id}
        data={listMovie}
        renderItem={item => displayMovies(item)}
        nestedScrollEnabled
        onEndReachedThreshold={0.5}
        contentContainerStyle={{paddingBottom: 100}}
        onEndReached={() => {
          console.log('reached out');
          if (nowPlaying.page < nowPlaying.total_pages) {
            setrefetch(true);
            setpage(nowPlaying.page + 1);
          }
        }}
        renderToHardwareTextureAndroid
        decelerationRate={'fast'}
        disableVirtualization
      />
    </View>
  );
};

export default NowPlayingScreen;
