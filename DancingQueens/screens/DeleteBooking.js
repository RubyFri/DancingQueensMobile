import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeleteBooking({ navigation }) {
  const [username, setUsername] = useState('');
  const [booking_id, setid] = useState('')
  const [token, setToken] = useState('');


  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedToken = await AsyncStorage.getItem('token');
        if (storedUsername) {
          setUsername(storedUsername);
        }
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        //console.error('Error loading user data:', error);
      }
    };
    loadUser();
  }, []);


  const handleDeleteBooking = async () => {
    if (booking_id == '') {
      Alert.alert('Error', 'Please list an id');
      return;
    }
  
    const payload = {
      booking_id: parseInt(booking_id),
    };
  
    try {
      //console.log('Sending request with payload:', payload); // Log payload
  
      const response = await fetch('http://localhost:8080/index.php/booking/delete', {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const responseText = await response.text();
      //console.log('Raw response:', responseText); // Log the raw response
  
      let data;
      try {
        data = JSON.parse(responseText); // Try to parse JSON response
      } catch (error) {
        //console.error('Invalid JSON response:', responseText); // Log invalid response
        Alert.alert('Error', 'You can only delete your own bookings.');
        return;
      }
  
      if (response.ok) {
        Alert.alert('Booking deleted successfully!');
        navigation.navigate('LoginLanding');
      } else {
        //console.error('Error from API:', data.message || 'Booking deletion failed');
        Alert.alert('Error', data.message || 'Booking deletion failed');
      }
    } catch (error) {
      //console.error('API Error:', error); // Log the error to identify the issue
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MeetDancers')}>
            <Text style={styles.buttonText}>Meet Our Dancers!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginLanding')}>
            <Text style={styles.buttonText}>My Profile</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading1}>DELETE BOOKING</Text>

        <Text style={styles.p}>Booking ID</Text>
        <TextInput
                  style={styles.input}
                  placeholder="Enter booking ID"
                  value={booking_id}
                  onChangeText={setid}
                  autoComplete="off"
                  textContentType="none"
                  autoCorrect={false}
                  spellCheck={false}
                  inputMode='numeric'
        />

        <Button title="Delete Booking" onPress={handleDeleteBooking} />
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
    padding: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    margin: '5%',
    flexWrap: 'wrap',
    color: '#483D03',
  },
  p: {
    color: '#646536',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    margin: '3%',
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
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  dropdown: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: '3%',
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '80%',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
