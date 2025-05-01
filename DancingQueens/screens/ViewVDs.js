import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedImage from './AnimatedImage';


export default function ViewVDs({ navigation }) {
    const [dances, setDances] = useState([]);

    const toPaths = (item) => {
      const paths = [];
      for (i of item.poses) {
        const filename = `${item.dancers}Pose${i}.png`;
            try {
              paths.push({
                items: '../assets/poses/${filename}'
              });
            } catch (error) {
              console.warn(`Missing image: ${filename}`);
            }
      }
      return paths;
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                    // Fetch bookings after setting the session ID
                    const response = await fetch('http://localhost:8080/index.php/dances/list', {
                        method: 'GET',
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
                        setDances(data); // Where data is an array of dances
                    } else {
                        Alert.alert('Error fetching dances', 'Could not retrieve virtual dances.');
                    }
                } 
            catch (error) {
                //console.error('Error:', error);
                Alert.alert('Error', 'Something went wrong while loading your data.');
            }
        };
    
        loadData();
    }, [navigation])
  

        const renderDance = ({ item }) => ( //item represents one virtual dance renders the table
            <View style={styles.bookingCard}>
              <Text style={styles.bookingText}>User: {item.username}</Text>
              <AnimatedImage imagePaths={toPaths(item)}></AnimatedImage>
            </View>
          );
        
    return (
    <View style={styles.container}>
      <View style = {styles.row} /* The Navbar */> 
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Home')}><Text style = {styles.buttonText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('MeetDancers')}><Text style = {styles.buttonText}>Meet Our Dancers!</Text></TouchableOpacity>
    </View>
        <FlatList 
          data={dances}
          renderItem={renderDance}
          keyExtractor={(item) => item.dance_id.toString()}
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
