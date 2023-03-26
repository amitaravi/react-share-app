import React, { useState } from 'react';
import { TouchableOpacity, Text, View ,LayoutAnimation, UIManager, Platform, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();


const LandingPage = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const handleFavouritesPress = () => {
    navigation.navigate('Cart');
    setExpanded(false);
  };
 
  const[selected, setSelected] = React.useState("");

  const cat_data = [
    {Key: '1', value: 'Electronics' },
    {Key: '2', value: 'Health' },
    {Key: '3', value: 'Beauty and Wellness' },
    {Key: '4', value: 'Hall Essentials' },
  ]

  const type_data = [
    {Key: '1', value: 'Buy' },
    {Key: '2', value: 'Rent' },
  ]

  
  return (
    <View style={styles.gradient}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.title, { textAlign: 'center' }]}>Looking for?</Text>
        </View>
        <Text style={styles.dropdownLabel}>Category:</Text>
        <SelectList setSelected={setSelected} data={cat_data} />
        <Text style={styles.dropdownLabel}>Purchase Type:</Text>
        <SelectList setSelected={setSelected} data={type_data} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={()=>{navigation.navigate('SearchProducts')}}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'white',
    height: '100%',
    width: '70%',
    paddingTop:  20,
    paddingLeft: 20,
    alignItems: 'flex-start',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 container: {
    flex: 1,
   
  
    justifyContent: 'center',
  },
    gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bca0dc',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems:'center'
  },
  dropdowns: {
   
    flexDirection: 'column', // modified flexDirection value
    width: '100%',
    alignItems: 'center'
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 10,
  
    width: '60%',
    height: 40,
 
    marginBottom: 30,
  },
    buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 70,
marginRight: 70
  },
   
  dropdownLabel: {
    fontWeight: 'bold',
    marginTop:10,
    marginBottom: 5,
     textAlign: 'center'
  },
  
  dropdown: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'black',
    fontWeight: 'bold',
  }
});

export default LandingPage;




