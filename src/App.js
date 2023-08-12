import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screen/Home';
import Constants from './Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieDetails from './Screen/MovieDetails';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="Home"
          component={Home}
          // options={{headerShown: false}}
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
