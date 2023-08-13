import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from './DashboardTab/HomeTab';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../Constants';
import NowPlayingScreen from './DashboardTab/NowPlayingTab';
import UpComingScreen from './DashboardTab/UpComingTab';
import PopularScreen from './DashboardTab/PopularTab';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createMaterialBottomTabNavigator();

const DashboardMovies = () => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <Tab.Navigator
        activeColor={Constants.activeColor}
        inactiveColor={Constants.fadedColor}
        barStyle={{backgroundColor: Constants.tabColor}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Now Playing"
          component={NowPlayingScreen}
          options={{
            //   tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Up Coming"
          component={UpComingScreen}
          options={{
            //   tabBarLabel: 'Updates',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Popular"
          component={PopularScreen}
          options={{
            //   tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default DashboardMovies;

const styles = StyleSheet.create({});
