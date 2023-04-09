import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image} from 'react-native';
import { StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from '../src/consts/colors';
import Slider from '@react-native-community/slider';


enableScreens();

const LandingPage = ({ navigation }) => {

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  }

  const[cselected, setcSelected] = useState("");
  const[tselected, settSelected] = useState("");
  const [expanded, setExpanded] = useState(false);

   const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const handleFavouritesPress = () => {
    navigation.navigate('Cart');
    setExpanded(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={{ width: 50, height: 50 }} />
      )}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );

  const Card = ({item}) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDescription', item)}>
        <View style={styles.card}>
          <View style={{alignItems: 'flex-end'}}>
              <Icon
                name="hearto"
                size={18}
                color={COLORS.black}
              /> 
           </View>

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
              {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={{ width: 50, height: 50 }} />
      )}
          </View>
          <View 
           style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
            {item.name}
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold'}}>
              ${item.price}
            </Text>
         
           
          
            </View>
          </View>
      </TouchableOpacity>
    );

 
  return (
    <View style={styles.gradient}>
      <View style={styles.container}>
      <View>
          <Text style={styles.title}>Looking for?</Text>
        </View>
        <Text style={styles.dropdownLabel}>Category:</Text>
        <View style={{borderWidth: 1, borderRadius: 10}}>
        <Picker
          dropdownIconColor={'black'}
          style={styles.picker}
          selectedValue={cselected}
          onValueChange={(value) => setcSelected(value)}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Clothing" value="clothing" />
          <Picker.Item label="Home and Garden" value="home-and-garden" />
          <Picker.Item label="Beauty and Personal Care" value="beauty-and-personal-care" />
        </Picker>

        </View>
        <Text style={styles.dropdownLabel}>Purchase Type:</Text>
        <View style={{borderWidth: 1, borderRadius: 15}}>
        <Picker
          style={styles.picker}
          selectedValue={tselected}
          dropdownIconColor={'black'}
          onValueChange={(value) => settSelected(value)}
        >
          <Picker.Item label="Select a Purchase Type" value="" />
          <Picker.Item label="Rent" value="rent" />
           <Picker.Item label="Buy" value="buy" />
           <Picker.Item label="Give" value="give" />
        </Picker>
          
        </View>
        {
          tselected != 'give' ? 
          <View>
               <Text style={styles.dropdownLabel}>Price:</Text>
          <Slider
              style={{width: 200, height: 40, alignSelf: 'center'}}
              minimumValue={5}
              maximumValue={1000}
              minimumTrackTintColor="#BCA0DC"
              maximumTrackTintColor="#000000"
              onValueChange={handleSliderChange}
              thumbTintColor='#BCA0DC'
              step={1}
          /> 
          <Text style={{color: 'black', alignSelf: 'center'}}>{sliderValue}</Text>
          </View>   : <View></View>

        }
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>{
                // navigation.navigate('SearchProducts',{
                //   category: cselected,
                //   type: tselected
                // })
                navigation.navigate('SwipingTest',{
                       category: cselected,
                       type: tselected,
                       price: sliderValue
                })
          }}>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '500'}}>Search</Text>
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
    width: '80%',
    alignSelf: 'center',

  },

  gradient: {
    flex: 1,
    backgroundColor: '#fff'
  },
  
  title: {
    fontSize: 30,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 30,
    color: "#1E1E1E"
  },

  picker: {
    borderWidth: 1,
    borderRadius: 10,
    color: '#000000',
    width: '80%',
    height: 25,
 
    marginBottom: 30,
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: '#BCA0DC',
    borderRadius: 30,
    marginTop: 30,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
   
  dropdownLabel: {
    fontWeight: 'bold',
    marginTop:15,
    marginBottom: 15,
     textAlign: 'center',
     color:'#1E1E1E',
     fontSize: 20
  },
  
  dropdown: {
    flex: 1,
  },
});

export default LandingPage;




