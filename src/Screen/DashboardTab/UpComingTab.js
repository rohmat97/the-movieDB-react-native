// @ts-nocheck
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View, Text} from 'react-native';
import Styles, {deviceWidth} from '../../Styles';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import {useGetUpComing} from '../../hooks/useGetUpComing';

const UpComingScreen = props => {
  const {navigation} = props;
  const [listMovie, setlistMovie] = useState([]);
  const [upComing, loadingUpComing, setpage, refetch, setrefetch] =
    useGetUpComing();

  const displayMovies = useCallback(
    ({item}) => {
      if (!item) {
        return null;
      }
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.push('movieDetails', {movieId: item?.id});
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
    },
    [navigation],
  );

  useEffect(() => {
    if (upComing) {
      setlistMovie(listMovie.concat(upComing?.results));
    }
  }, [upComing]);

  if (loadingUpComing) {
    return (
      <View style={Styles.sectionBg}>
        <Loader />
      </View>
    );
  }
  return (
    <View style={Styles.sectionBg}>
      <Header title={'Up Coming'} />
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
          if (upComing.page < upComing.total_pages) {
            setrefetch(true);
            setpage(upComing.page + 1);
          }
        }}
        renderToHardwareTextureAndroid
        decelerationRate={'fast'}
        disableVirtualization
      />
    </View>
  );
};

export default UpComingScreen;
