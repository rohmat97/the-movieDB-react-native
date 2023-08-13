// @ts-nocheck
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetails from '@Screen/MovieDetails';
import DashboardMovies from '@Screen/DashboardMovies';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="Dashboard Movies"
          component={DashboardMovies}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="movieDetails"
          component={MovieDetails}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
