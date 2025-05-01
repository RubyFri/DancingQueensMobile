import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateAcc({ navigation }) {
    const [username, setUsername] = useState(''); //create empty variables to store username (which the user will enter)
    const [password, setPassword] = useState('');//create empty variables to store pass 
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkLoginStatus = async () => {
        const sessionId = await AsyncStorage.getItem('session_id');
        setIsLoggedIn(!!sessionId); // true if sessionId exists, false if not
      };
    
      const checkagain = navigation.addListener('focus', checkLoginStatus); // Refresh/ check again if user logged in every time this is the screen being shown
    
      checkLoginStatus();
    
      return checkagain;
    }, [navigation]);

    const handleCreateAccount = async () => {
        if (password.length < 10) {
            Alert.alert('Password is too short, try again!');
            return;
          }
        if (password !== confirmPassword) { //check that passwords match
          Alert.alert('Passwords do not match, try again');
          return;
        }

        const payload = { //json body to be sent to the API
            username: username,
            password: password,
          };

        try { //try sending the new user and password to API
            const response = await fetch('http://localhost:8080/index.php/user/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

        const data = await response.json();

        if (response.ok) {
            Alert.alert('Account created successfully!');
            navigation.navigate('Login'); // send them to the login page
          //} //this DOESN't WORKelse if (data.message && data.message.includes('Duplicate')) {
            //Alert.alert('Username is already taken');
          } else {
            Alert.alert('Error', data.message || 'Account creation failed');
          }
        } catch (error) {
          //console.error('API Error:', error);
          Alert.alert('Error', 'Something went wrong. Try again later.');
        }
      };
        

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style = {styles.row} /* The Navbar */> 
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Home')}><Text style = {styles.buttonText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('MeetDancers')}><Text style = {styles.buttonText}>Meet Our Dancers!</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Login')}><Text style = {styles.buttonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('ViewVDs')}><Text style = {styles.buttonText}>Virtual Dances</Text></TouchableOpacity>
        {isLoggedIn && (
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('LoginLanding')}><Text style = {styles.buttonText}>My Profile</Text></TouchableOpacity>
      )}   
      </View>
<Text style={styles.heading1}>CREATE ACCOUNT</Text>

<Text style={styles.p}>New Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
          autoComplete="off"
          textContentType="none"
          autoCorrect={false}
          spellCheck={false}
        />

        <Text style={styles.p}>New Password (min 10 chars)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          autoComplete="off"
          textContentType="none"
          autoCorrect={false}
          spellCheck={false}
          secureTextEntry
        />

        <Text style={styles.p}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoComplete="off"
          textContentType="none"
          autoCorrect={false}
          spellCheck={false}
          secureTextEntry
        />

        <Button title="Create Account" onPress={handleCreateAccount} />
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

    row: {
      alignContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
    },
  
    button: {
      backgroundColor: '#14943C',
      flexWrap: 'wrap',
      padding: '5%',
      alignItems: 'center'
    },
  
    buttonText: {
      fontSize: 20,
    }
});
