import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MultiSelect } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateBooking({ navigation }) {
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dancers, setDancers] = useState([]);
  const [token, setToken] = useState('');

  const dancersData = [
    { label: "Ruby", value: 1 },
    { label: "Yenta", value: 2 },
    { label: "Sage", value: 3 },
  ];

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
        console.error('Error loading user data:', error);
      }
    };
    loadUser();
  }, []);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const handleCreateBooking = async () => {
    if (dancers.length === 0) {
      Alert.alert('Error', 'Please select at least one dancer.');
      return;
    }
  
    // Convert dancers array to a comma-separated string
    const dancersString = dancers.map(dancer => dancer.toString()).join(',');
  
    const payload = {
      username: username,
      date: date.toISOString().split('T')[0], // Format date as "YYYY-MM-DD"
      time: time.toISOString().split('T')[1].slice(0, 8), // Format time as "HH:mm:ss"
      dancers: dancersString, // Send dancers as a string
    };
  
    try {
      console.log('Sending request with payload:', payload); // Log payload
  
      const response = await fetch('http://localhost:8080/index.php/booking/create', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const responseText = await response.text();
      console.log('Raw response:', responseText); // Log the raw response
  
      let data;
      try {
        data = JSON.parse(responseText); // Try to parse JSON response
      } catch (error) {
        console.error('Invalid JSON response:', responseText); // Log invalid response
        Alert.alert('Error', 'Something went wrong while creating the booking.');
        return;
      }
  
      if (response.ok) {
        Alert.alert('Booking created successfully!');
        navigation.navigate('BookingList');
      } else {
        console.error('Error from API:', data.message || 'Booking creation failed');
        Alert.alert('Error', data.message || 'Booking creation failed');
      }
    } catch (error) {
      console.error('API Error:', error); // Log the error to identify the issue
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
        <Text style={styles.heading1}>CREATE BOOKING</Text>

        <Text style={styles.p}>Booking Date</Text>
        <DateTimePicker value={date} style={styles.input} mode="date" display="default" onChange={onDateChange} />

        <Text style={styles.p}>Booking Time</Text>
        <DateTimePicker value={time} style={styles.input} mode="time" display="default" onChange={onTimeChange} />

        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          selectedStyle={styles.selectedStyle}
          data={dancersData}
          labelField="label"
          valueField="value"
          placeholder="Choose Dancers"
          search
          value={dancers}
          onChange={item => setDancers(item)}
          multiple={true}
          inside={true}
          renderSelectedItem={(item, unSelect) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Text>{item.label}</Text>
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <Text style={{ color: 'red', marginLeft: 5 }}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Button title="Create Booking" onPress={handleCreateBooking} />
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
