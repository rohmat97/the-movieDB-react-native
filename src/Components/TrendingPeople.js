// @ts-nocheck

import {FlatList, Image, Text, View} from 'react-native';
import Styles from '../Styles';
import Loader from './Loader';
import React from 'react';
import {useGetTrandingPeople} from '@hooks/useGetTrandingPeople';

const TrendingPeople = props => {
  const [people, loading] = useGetTrandingPeople(props);
  if (loading) {
    return <Loader />;
  }
  return (
    <View>
      <View>
        <Text style={Styles.heading}>{props.title}</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={people}
          renderItem={displayPeople}
          horizontal
        />
      </View>
    </View>
  );
};

const displayPeople = ({item}) => {
  return (
    <View style={Styles.trendingPeopleContainer}>
      <Image
        source={{uri: `${process.env.IMAGE_POSTER_URL}${item.profile_path}`}}
        style={Styles.trendingPeopleImage}
      />
      <Text style={Styles.trendingPeopleName}>{item.name}</Text>
    </View>
  );
};

export default TrendingPeople;
