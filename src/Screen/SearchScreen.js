/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
// @ts-nocheck
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';
import Loader from '../Components/Loader';
import Styles, {deviceWidth} from '../Styles';
import {useFindMovie} from '../hooks/useFindMovie';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import Constants from '../Constants';

import Icon from 'react-native-vector-icons/Entypo';
const SearchScreen = props => {
  const {navigation} = props;
  const [listMovie, setlistMovie] = useState([]);
  const [searchKey, setsearchKey] = useState('');
  const [findMovie, loadingFindMovie, setpage, refetch, setrefetch, setquery] =
    useFindMovie();

  const displayMovies = useCallback(
    ({item}) => {
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
              source={{
                uri: `${process.env.POSTER_IMAGE}${item?.poster_path}`,
              }}
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
    if (findMovie) {
      setlistMovie(listMovie.concat(findMovie?.results));
    }
  }, [findMovie]);

  useEffect(() => {
    navigation?.setOptions({
      title: 'Find Your Favorite Movie',
      headerStyle: {
        backgroundColor: Constants.baseColor,
      },
      headerTitleStyle: {color: Constants.textColor},
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation?.goBack}
          style={{marginRight: 12}}>
          <Icon name="back" size={34} color={Constants.textColor} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (loadingFindMovie) {
    return (
      <View style={Styles.sectionBg}>
        <Loader />
      </View>
    );
  }
  return (
    <View style={Styles.sectionBg}>
      <View style={{flexDirection: 'row'}}>
        <Searchbar
          placeholder="Search"
          onChangeText={setsearchKey}
          value={searchKey}
          style={{margin: 12, flex: 1}}
          onClearIconPress={() => {
            setquery('');
            setlistMovie([]);
          }}
        />
        <Button
          mode="contained"
          onPress={() => setquery(searchKey)}
          style={{alignSelf: 'center'}}>
          Search
        </Button>
      </View>

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
          if (findMovie.page < findMovie.total_pages) {
            setrefetch(true);
            setpage(findMovie.page + 1);
          }
        }}
        renderToHardwareTextureAndroid
        decelerationRate={'fast'}
        disableVirtualization
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
