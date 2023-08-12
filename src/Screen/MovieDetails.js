// @ts-nocheck
import React, {useEffect} from 'react';
import {
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

const MovieDetails = props => {
  const {navigation} = props;
  const [details, loading] = useGetDetailMovie(props.route.params.movieId);

  useEffect(() => {
    if (details)
      navigation?.setOptions({
        title: details?.original_title,
        headerStyle: {backgroundColor: Constants.baseColor},
        headerTitleStyle: {color: Constants.textColor},
      });
  }, [navigation, details]);

  const getGenre = () => {
    return details.genres.map(genre => (
      <View style={Styles.genreContainer}>
        <Text style={Styles.genre}>{genre.name}</Text>
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={Styles.sectionBg}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView style={Styles.sectionBg}>
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
        {details.homepage ? (
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

        <View style={Styles.detailsContainer}>
          <View>
            <Text style={Styles.heading}>BUDGET</Text>
            <Text style={Styles.details}>$ {details.budget}</Text>
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
          {getGenre()}
        </View>

        <TrendingPeople
          title="CAST"
          url={`/movie/${props.route.params.movieId}/credits`}
          isForPage="details"
        />

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
