import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Constants from '../Constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Icon name="search" size={25} color={Constants.textColor} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  heading: {
    fontSize: 19,
    color: Constants.fadedColor,
    margin: 10,
  },
});
