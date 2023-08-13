// @ts-nocheck
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetails from '@Screen/MovieDetails';
import DashboardMovies from '@Screen/DashboardMovies';
import SearchScreen from './Screen/SearchScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen
            name="Dashboard Movies"
            component={DashboardMovies}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="movie-details"
            component={MovieDetails}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="search-movie"
            component={SearchScreen}
            // options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
