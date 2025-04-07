import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MeetDancers() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Meet the Dancers:</Text>
    </View>
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


});