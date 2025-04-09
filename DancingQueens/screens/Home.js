import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Linking, Pressable, TouchableOpacity } from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({ navigation }) {
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
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('MeetDancers')}><Text style = {styles.buttonText}>Meet Our Dancers!</Text></TouchableOpacity>

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
        {isLoggedIn && (
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('LoginLanding')}><Text style = {styles.buttonText}>My Profile</Text></TouchableOpacity>
      )}  
            const [isLoggedIn, setIsLoggedIn] = useState(false);
      </View>
      <Text style={styles.heading1}> Feeling <Text style={styles.blueText}>Blue? </Text> 
      Hire Our Crew! We'll Dance For You! 💃 🕺 ✨</Text>

      <Image 
        source={require('./assets/team.jpeg')} // Path to image
        style={styles.image}
        accessible={true}
        accessibilityLabel="This is a photo of our dancing team!"
      />
      <Text style={styles.h2}> Our Mission </Text>
      <Text style={styles.p}>Sometimes, people are sad, and that sucks a lot. But do you know what
        doesn't suck? Dancing! That's why we created the Dancing Queens (and we
        are not even 17!) Essentially, you pay us the very very low cheap and
        affordable rate of 400 dollars per hour to dance for you until you feel
        cheered up again! We do not offer financial aid for our services because
        of how super cheap they are. </Text>
        
        <Text style={styles.h2}> Book Our Services!</Text>
        <Text style={styles.p}> Create or log in to an account to get started on booking a dance service! </Text>

        <Text style={styles.small}> This site was designed and published as part of the COMP 333 Software Engineering class at Wesleyan University. This is an exercise.
          However, if you think this is a good business venture please do let us know and we will maybe make it happen! Peace and love.</Text>
        <Text style={styles.small}> Photo credit to Sebastian Zimmeck</Text>
        <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/sebastianzimmeck')}>
  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
    View LinkedIn here
  </Text>
</Pressable>
      <StatusBar style="auto" />
    </View>
  
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Allows smooth scrolling effect
  },

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

  blueText: {
    fontStyle: 'italic',
    color: '#0000FF',
  },

  image: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '2%',
    marginBottom: 10,
  },
  h2: {
    fontSize: 20,
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
    flexWrap: 'wrap',
    
  },
  small: {
    color: '#646536',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
    margin:'3%',
    flexWrap: 'wrap',

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