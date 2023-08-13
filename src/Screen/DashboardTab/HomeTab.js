import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DiscoverMovies from '../../Components/DiscoverMovies';
import TrendingMovies from '../../Components/TrendingMovies';
import TrendingPeople from '../../Components/TrendingPeople';
import Constants from '../../Constants';
import Styles from '../../Styles';
import Header from '../../Components/Header';

const HomeScreen = props => {
  const {navigation} = props;

  useEffect(() => {
    navigation?.setOptions({
      // title: 'Movies',
      headerStyle: {backgroundColor: Constants.baseColor},
      headerTitleStyle: {color: Constants.textColor},
      headerRight: () => (
        <Icon name="search" size={25} color={Constants.textColor} />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={Styles.sectionBg}>
        <Header
          title={'Dashboard Home'}
          Action={() => navigation.navigate('search-movie')}
        />
        <DiscoverMovies {...props} />
        <TrendingPeople title="Trending People" />
        <TrendingMovies title="Trending Movies" {...props} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
