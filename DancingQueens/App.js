import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import MeetDancers from './screens/meetDancers';
import createAcc from './screens/createAcc';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MeetDancers" component={MeetDancers} />
        <Stack.Screen name="createAcc" component={createAcc} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}