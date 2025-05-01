import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import MeetDancers from './screens/meetDancers';
import CreateAcc from './screens/CreateAcc';
import Login from './screens/Login';
import LoginLanding from './screens/LoginLanding';
import CreateBooking from './screens/CreateBooking';
import DeleteBooking from './screens/DeleteBooking';
import ModifyBooking from './screens/ModifyBooking';
import CreateVRDance from './screens/CreateVRDance';
import ReadBooking from './screens/ReadBooking';
import ViewVDs from './screens/ViewVDs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MeetDancers" component={MeetDancers} />
        <Stack.Screen name="CreateAcc" component={CreateAcc} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateBooking" component={CreateBooking} />
        <Stack.Screen name="LoginLanding" component={LoginLanding} />
        <Stack.Screen name="DeleteBooking" component={DeleteBooking} />
        <Stack.Screen name="ModifyBooking" component={ModifyBooking} />
        <Stack.Screen name="CreateVRDance" component={CreateVRDance} />
        <Stack.Screen name="ReadBooking" component={ReadBooking} />
        <Stack.Screen name="ViewVDs" component={ViewVDs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}