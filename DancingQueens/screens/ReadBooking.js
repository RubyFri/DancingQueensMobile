import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginLanding({ navigation }) {
    const [username, setUsername] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Get the stored username and session ID
                const storedUsername = await AsyncStorage.getItem('username');
                const storedSessionId = await AsyncStorage.getItem('session_id');
    
                if (storedUsername && storedSessionId) {
                    setUsername(storedUsername);
                    setSessionId(storedSessionId);
    
                    // Fetch bookings after setting the session ID
                    const response = await fetch('http://localhost:8080/index.php/booking/list?limit=30', {
                        method: 'GET',
                        credentials:"include"
                    });

                    //console.log(response);
                    const responseText = await response.text(); // Get the response as text first
    
                    // Try to parse the response as JSON
                    let data;
                    try {
                        data = JSON.parse(responseText);
                    } catch (error) {
                        // Handle invalid JSON response (i.e., error message)
                        //console.error("Invalid JSON response:", responseText);
                        Alert.alert('Error', 'Something went wrong while loading your data.');
                        return;
                    }
                    //console.log(response);
                    if (response.ok) {
                          // Filter bookings to only include those with a date after the current date
                        const currentDate = new Date(); // Get the current date
                        const filteredBookings = data.filter(booking => {
                            const bookingDate = new Date(booking.date); // Convert booking date to a Date object
                            return bookingDate >= currentDate; // Only include bookings with a future date
                        });
                        console.log(filteredBookings);
                        setBookings(filteredBookings); // Where data is an array of bookings
                    } else {
                        Alert.alert('Error fetching bookings', 'Could not retrieve bookings.');
                    }
                } else {
                    Alert.alert('Session expired', 'Please log in again.');
                    navigation.navigate('Login');
                }
            } catch (error) {
                //console.error('Error:', error);
                Alert.alert('Error', 'Something went wrong while loading your data.');
            }
        };
    
        loadData();
    }, [navigation])

        const renderBookingItem = ({ item }) => ( //item represents one booking renders the table
            <View style={styles.bookingCard}>
              <Text style={styles.bookingText}>Booking ID: {item.booking_id}</Text>
              <Text style={styles.bookingText}>Customer Name: {item.username}</Text>
              <Text style={styles.bookingText}>Date: {item.date}</Text>
              <Text style={styles.bookingText}>Time: {item.time}</Text>
              <Text style={styles.bookingText}>Dancers Booked: {item.dancers}</Text>
            </View>
          );
        
    return (
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
          <Text style={styles.heading1}>VIEW ALL USERS BOOKINGS</Text>

        <FlatList 
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.booking_id.toString()}
        />

      <StatusBar style="auto" />
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
    },

    bookingCard: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      },
      bookingText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
      },
});
