import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MultiSelect } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateVRDance({ navigation }) {
  const [username, setUsername] = useState('');
  const [dancers, setDancers] = useState([]);
  const [token, setToken] = useState('');
  const [poses, setPoses] = useState([]);

  const dancersData = [
    { label: "Ruby", value: "Ruby" },
    { label: "Yenta", value: "Yenta" },
    { label: "Sage", value: "Sage" },
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
        //console.error('Error loading user data:', error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const generatePoseList = () => {
      const allPoses = [];
      dancers.forEach((dancer) => {
        const count = 7; // assume all dancers have 7 poses
        for (let i = 1; i <= count; i++) {
          const filename = `${dancer}Pose${i}.heic`;
          try {
            allPoses.push({
              dancer,
              filename,
              selected: false,
              uri: require(`../assets/poses/${filename}`),
            });
          } catch (error) {
            console.warn(`Missing image: ${filename}`);
          }
        }
      });
      setPoses(allPoses);
    };

    const togglePose = (pose) => {
        setPoses((prev) =>
          prev.map((p) =>
            p.filename === pose.filename ? { ...p, selected: !p.selected } : p
          )
        );
      };
    
    generatePoseList();
  }, [dancers]);

  const handleCreateBooking = async () => {
    if (dancers.length === 0) {
      Alert.alert('Error', 'Please select at least one dancer.');
      return;
    }
  
    // Convert dancers array to a comma-separated string
    const dancersString = dancers.join(',');
    const poseString = poses
      .filter((p) => p.selected)
      .map((p) => p.filename)
      .join(',');

    const payload = {
      username: username,
      dancers: dancersString, // Send dancers as a string
      poses: poseString //send poses as a string of image urls.

    };
  
    try {
      //console.log('Sending request with payload:', payload); // Log payload
  
      const response = await fetch('http://localhost:8080/index.php/dances/create', {
        method: 'POST',
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
        Alert.alert('Error', 'Something went wrong while creating the booking.');
        return;
      }
  
      if (response.ok) {
        Alert.alert('Dance created successfully!');
        navigation.navigate('LoginLanding');
      } else {
        //console.error('Error from API:', data.message || 'Booking creation failed');
        Alert.alert('Error', data.message || 'Booking creation failed');
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
        <Text style={styles.heading1}>CREATE VIRTUAL DANCE</Text>

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
          onChange={(item) => setDancers(item)}
          multiple
          inside
          renderSelectedItem={(item, unSelect) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Text>{item.label}</Text>
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <Text style={{ color: 'red', marginLeft: 5 }}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {dancers.length > 0 && (
          <>
            <Text style={styles.p}>Select Poses</Text>
            <View style={styles.poseContainer}>
              {poses.map((pose, index) => (
                <TouchableOpacity key={index} onPress={() => togglePose(pose)} style={{ margin: 5 }}>
                  <Image
                    source={pose.uri}
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 3,
                      borderColor: pose.selected ? 'green' : 'transparent',
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

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
