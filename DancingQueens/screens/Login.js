import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Button, Linking, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');//create empty variables to store username (which the user will enter)
    const [password, setPassword] = useState('');

    const handleLogin = async () => { //json body to be sent to the API
        const payload = {
          username,
          password,
        };

        try {
            const response = await fetch('http://localhost:8080/index.php/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });
      
            const data = await response.json();
      
            if (response.ok && data.session_id) {
                await AsyncStorage.setItem('session_id', data.session_id); //store session
                Alert.alert('Login successful!');
              //navigation.navigate('Home'); navigate to login landing once we make it
              return;
            } 
            else if (data.message) {
                Alert.alert('Login failed', data.message);
            }
            else {
              Alert.alert('Login failed', data.message || 'Wrong User id or password');
            }
          } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'Something went wrong. Try again later.');
          }
        };

    return (

        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
        <Button
    title="Home"
    onPress={() => navigation.navigate('Home')}/>

    <Button
    title="Meet Our Dancers"
    onPress={() => navigation.navigate('MeetDancers')}/>

    <Button
    title="Create Account"
    onPress={() => navigation.navigate('CreateAcc')}/>
  
          <Text style={styles.heading1}>LOGIN</Text>
  
          <Text style={styles.p}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
  
          <Text style={styles.p}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
  
          <Button title="Submit" onPress={handleLogin} />
        </View>
  
        <StatusBar style="auto" />
      </ScrollView>
    );
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0F1BF',
        alignItems: 'center',
        justifyContent: 'center',
      },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    margin:'5%',
    flexWrap: 'wrap',
    color: '#483D03',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    margin:'2%',
    flexWrap: 'wrap',
    color: '#483D03',
  },
  p: {
    color: '#646536',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    margin:'3%',
    flexWrap: 'wrap',},


});