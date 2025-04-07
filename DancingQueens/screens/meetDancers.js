import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function MeetDancers() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.heading1}>Meet the Dancers:</Text>
      <Text style={styles.h2}>Ruby</Text>
      <Text style={styles.p}>Hi I'm Ruby! I am a current a Sophomore at Wesleyan University studying Computer Science and Mathematics.
             I am honestly an awful dancer– even though I technically took Introduction to Dance (Sorry Professor Doug), 
             but that's part of the reason you should hire me! I will make you laugh
            your socks off (not in a weird way) with my not-so-groovy moves.</Text>
        <Image 
        source={require('./assets/Ruby.avif')} // Path to image
        style={styles.image}
        accessible={true}
        accessibilityLabel="This is a photo of our dancing queen Ruby. 
        She is smiling widely and posing beautifully with one leg up."
      />
    <Text style={styles.h2}>Yenta</Text>
      <Text style={styles.p}>Hello! I am Yenta, the queen among dancers. I dance hip hop, ballet, West African, Javanese and Tap.
           I also dance Contemporary, Ballroom and Swing. Oh, and also Tango. Hit me up to book.</Text>
        <Image 
        source={require('./assets/Yenta.avif')} // Path to image
        style={styles.image}
        accessible={true}
        accessibilityLabel="This is a photo of our dancing queen Yenta. 
        She is smiling widely and posing beautifully with one leg up."
      />

    <Text style={styles.h2}>Sage</Text>
      <Text style={styles.p}>Hi I'm Sage! I'm a junior at Wesleyan University majoring in Math and Computer Science.
          Contrary to the title of this page, I don't actually dance! You should still hire me anyway
          so that I can get paid to do what I love - standing around awkwardly.</Text>
        <Image 
        source={require('./assets/Sage.avif')} // Path to image
        style={styles.image}
        accessible={true}
        accessibilityLabel="This is a photo of our dancing queen Sage. 
        She is smiling widely and posing beautifully with one leg up."
      />


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
    marginBottom: 20,
    margin:'3%',
    flexWrap: 'wrap',},


});