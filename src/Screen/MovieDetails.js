// @ts-nocheck
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Loader from '../Components/Loader';
import TrendingMovies from '../Components/TrendingMovies';
import TrendingPeople from '../Components/TrendingPeople';
import Constants from '../Constants';
import {useGetDetailMovie} from '../hooks/useGetDetailMovie';
import Styles from '../Styles';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import {currencyFormat} from '@utils/currency';
import {useGetVideoMovies} from '@hooks/useGetVideoMovies';
import WebView from 'react-native-webview';

const MovieDetails = props => {
  const {navigation} = props;
  const [details, loading] = useGetDetailMovie(props.route.params.movieId);
  const [video, loadingVideo] = useGetVideoMovies(props.route.params.movieId);

  useEffect(() => {
    if (details) {
      navigation?.setOptions({
        title: details?.original_title,
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
    }
  }, [navigation, details]);

  if (loading) {
    return (
      <View style={Styles.sectionBg}>
        <Loader />
      </View>
    );
  }
  return (
    <ScrollView style={Styles.sectionBg} nestedScrollEnabled>
      <View>
        <View>
          <Image
            source={{
              uri: `${process.env.IMAGE_POSTER_URL}${details?.backdrop_path}`,
            }}
            style={Styles.imageBg}
          />
        </View>
        <Text style={Styles.detailsMovieTitle}>{details?.original_title}</Text>
        {details?.homepage ? (
          <View style={Styles.linkContainer}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(details.homepage);
              }}>
              <Icon name="link" color={Constants.textColor} size={22} />
            </TouchableOpacity>
          </View>
        ) : null}

        <Text style={Styles.heading}>OVERVIEW</Text>
        <Text style={Styles.overview}>{details.overview}</Text>

        <Text style={Styles.heading}>TRAILER</Text>
        {loadingVideo ? (
          <Loader />
        ) : (
          <View
            renderToHardwareTextureAndroid={true}
            style={{marginHorizontal: 12}}>
            <WebView
              originWhitelist={['*']}
              source={{
                html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video?.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
              }}
              style={{height: 200, width: '100%'}}
              allowsFullscreenVideo
              nestedScrollEnabled
              bounces={false}
              scrollEnabled={false}
            />
          </View>
        )}

        <Text style={Styles.heading}>VOTES / RATINGS</Text>
        <View style={Styles.containerRatings}>
          <StarRatingBar
            score={details.vote_average / 2}
            dontShowScore={true}
            allowsHalfStars={true}
            accurateHalfStars={true}
          />
          <Text style={Styles.overview}>
            {details?.vote_average?.toFixed(1)}
          </Text>
          <Text style={Styles.overview}>{details?.vote_count} votes</Text>
        </View>
        <View style={Styles.detailsContainer}>
          <View>
            <Text style={Styles.heading}>BUDGET</Text>
            <Text style={Styles.details}>{currencyFormat(details.budget)}</Text>
          </View>

          <View>
            <Text style={Styles.heading}>DURATION</Text>
            <Text style={Styles.details}>{details.runtime} min.</Text>
          </View>

          <View>
            <Text style={Styles.heading}>RELEASE DATE</Text>
            <Text style={Styles.details}>{details.release_date}</Text>
          </View>
        </View>

        <Text style={Styles.heading}>GENRE</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FlatList
            nestedScrollEnabled
            horizontal
            data={details.genres || []}
            renderItem={({item}) => (
              <View style={Styles.genreContainer}>
                <Text style={Styles.genre}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        <Text style={Styles.heading}>ORIGINAL LANGUAGE</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FlatList
            nestedScrollEnabled
            horizontal
            data={details.spoken_languages || []}
            renderItem={({item}) =>
              item?.name ? (
                <View style={Styles.genreContainer}>
                  <Text style={Styles.genre}>{item.name}</Text>
                </View>
              ) : null
            }
          />
        </View>
        {/* List of Actor */}
        <TrendingPeople
          title="CAST / ACTOR"
          url={`/movie/${props.route.params.movieId}/credits`}
          isForPage="details"
        />

        <Text style={Styles.heading}>PRODUCTION COMPANY</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FlatList
            nestedScrollEnabled
            horizontal
            data={details.production_companies || []}
            renderItem={({item}) =>
              item?.logo_path ? (
                <View style={Styles.genreContainer}>
                  <Image
                    source={{
                      uri: `${process.env.IMAGE_POSTER_URL}${item?.logo_path}`,
                    }}
                    style={[
                      Styles.trendingPeopleImage,
                      {backgroundColor: 'white'},
                    ]}
                  />
                </View>
              ) : null
            }
          />
        </View>
        <Text style={Styles.heading}>PRODUCTION COUNTRY</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FlatList
            nestedScrollEnabled
            horizontal
            data={details.production_countries || []}
            renderItem={({item}) => (
              <View style={Styles.genreContainer}>
                <Text style={Styles.genre}>{item.name}</Text>
              </View>
            )}
          />
        </View>
        {/* List of Similar Movies */}
        <TrendingMovies
          title="SIMILAR MOVIES"
          navigation={props.navigation}
          url={`/movie/${props.route.params.movieId}/similar`}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetails;
