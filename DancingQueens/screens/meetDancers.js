import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,Linking, Pressable} from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeetDancers({navigation}) {
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
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style = {styles.row} /* The Navbar */> 
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Home')}><Text style = {styles.buttonText}>Home</Text></TouchableOpacity>
        {isLoggedIn && (
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('LoginLanding')}><Text style = {styles.buttonText}>My Profile</Text></TouchableOpacity>
      )} 
      {!isLoggedIn && (
        <>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAcc')}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
      </View>
      <Text style={styles.heading1}>Meet the Dancers:</Text>
      <Text style={styles.h2}>Ruby</Text>
      <Text style={styles.p}>Hi I'm Ruby! I am a current a Sophomore at Wesleyan University studying Computer Science and Mathematics.
             I am honestly an awful dancer– even though I technically took Introduction to Dance (Sorry Professor Doug), 
             but that's part of the reason you should hire me! I will make you laugh
            your socks off (not in a weird way) with my not-so-groovy moves.</Text>
        <Image source={require('./assets/ruby.jpeg')} // Path to image
        style={styles.image}
        accessible={true}
        accessibilityLabel="This is a photo of our dancing queen Ruby. 
        She is smiling widely and posing beautifully with one leg up."
      />
              <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/ruby-friedman-04117b301/')}>
  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
    View Ruby's LinkedIn here!
  </Text>
</Pressable>
    <Text style={styles.h2}>Yenta</Text>
      <Text style={styles.p}>Hello! I am Yenta, the queen among dancers. I dance hip hop, ballet, West African, Javanese and Tap.
           I also dance Contemporary, Ballroom and Swing. Oh, and also Tango. Hit me up to book.</Text>
        <Image source={require('./assets/yenta.jpeg')} // Path to image
        style={styles.image}
        accessible={true}
        accessibilityLabel="This is a photo of our dancing queen Yenta. 
        She is smiling widely and posing beautifully with one leg up."
      />

<Pressable onPress={() => Linking.openURL('https://play2048.co')}>
  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
    View Yenta's favorite game here!
  </Text>
</Pressable>

    <Text style={styles.h2}>Sage</Text>
      <Text style={styles.p}>Hi I'm Sage! I'm a junior at Wesleyan University majoring in Math and Computer Science.
          Contrary to the title of this page, I don't actually dance! You should still hire me anyway
          so that I can get paid to do what I love - standing around awkwardly.</Text>
        <Image source={require('./assets/sage.jpeg')} // Path to image
        style={styles.image}
        accessible={true}
        accessibilityLabel="This is a photo of our dancing queen Sage. 
        She is smiling widely and posing beautifully with one leg up."
      />
      <Pressable onPress={() => Linking.openURL('https://www.instagram.com/saltman8345/')}>
  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
    View Sage's instagram here!
  </Text>
</Pressable>


    </View>
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
    marginBottom: 5,
    margin:'3%',
    flexWrap: 'wrap',},

  image: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '10%',
      marginBottom: 20,
    },
    
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