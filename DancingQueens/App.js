import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.heading}> Feeling <Text style={styles.blueText}>Blue? </Text> 
      Hire Our Crew! We'll Dance For You! 💃 🕺 ✨</Text>

      <Image 
        source={require('./assets/team.jpeg')} // Path to your local image
        style={styles.image}
      />

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

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#483D03',
  },

  blueText: {
    fontStyle: 'italic',
    color: '#0000FF',
  },

  image: {
    width: 200, // Set the width of the image
    height: 200, // Set the height of the image
    resizeMode: 'contain', // Ensures the image maintains aspect ratio
  }

});
