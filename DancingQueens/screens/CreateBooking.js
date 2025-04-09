import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert, TouchableOpacity} from 'react-native';
import { useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MultiSelect } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CreateBooking({ navigation }) {
    const [date, setDate] = useState(new Date()); //create empty variables to store date
    const [time, setTime] = useState(new Date()); //create empty variables to store time
    const [dancers, setDancers] = useState([]); //create empty variables to store the dancers selected
    const [username, setUsername] = useState('');

    const dancersData  = [
        {label: "Ruby", value: 1},
        {label: "Yenta", value: 2},
        {label: "Sage", value: 3},
    ];

    useEffect(() => {
      const loadUser = async () => {
          const storedUsername = await AsyncStorage.getItem('username');  // Fetch username from AsyncStorage
          if (storedUsername) {
              setUsername(storedUsername);
          }
      };

      loadUser();
  }, []);

    // Handles changing the date
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      };

    // Handles changing the time
    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
      };

    const handleCreateBooking = async () => {

        const payload = { //json body to be sent to the API
            username: username,
            date: date.toISOString(),
            time: time.toISOString(),
            dancers: dancers,
          };

        try { //try sending the new booking to API
            const response = await fetch('http://localhost:8080/index.php/booking/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                
              },
              body: JSON.stringify(payload),
            });

        const data = await response.json();
        console.log(response);

        if (response.ok) {
            Alert.alert('Booking created successfully!');
            navigation.navigate('LoginLanding'); 
          } else {
            Alert.alert('Error', data.message || 'Booking Creation failed');
          }
        } catch (error) {
          console.error('API Error:', error);
          Alert.alert('Error', 'Something went wrong. Try again later.');
        }
      };
        

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style = {styles.row} /* The Navbar */> 
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Home')}><Text style = {styles.buttonText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('MeetDancers')}><Text style = {styles.buttonText}>Meet Our Dancers!</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('LoginLanding')}><Text style = {styles.buttonText}>My Profile</Text></TouchableOpacity>
      </View>
        <Text style={styles.heading1}>CREATE BOOKING</Text>


        <Text style={styles.p}>Booking Date</Text>
        <DateTimePicker
          value={date}
          style={styles.input}
          mode="date"
          display="default"
          onChange={onDateChange}
        />

        <Text style={styles.p}>Booking Time</Text>
        <DateTimePicker
          value={time}
          style={styles.input}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />

        <MultiSelect
            style = {styles.dropdown}
            placeholderStyle = {styles.placeholderStyle}
            selectedTextStyle = {styles.selectedTextStyle}
            inputSearchStyle = {styles.inputSearchStyle}
            selectedStyle={styles.selectedStyle}
            data = {dancersData}
            labelField = {"label"}
            valueField={"value"}
            placeholder = "Choose Dancers"
            value = {dancers}
            onChange = {item => {setDancers(item);}}
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

    dropdown: {
        height: 25,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: '3%',
        backgroundColor: '#fff',
        marginBottom: 20,
        width: '80%', //
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
