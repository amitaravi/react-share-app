import React, { useState } from 'react';
import { TouchableOpacity, Text, View ,LayoutAnimation, UIManager, Platform, StatusBar, FlatList, Image, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from '../src/consts/colors';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 


enableScreens();

const height = Dimensions.get('window').height/1.5;
const width = Dimensions.get('window').width/1.1

const searchDocuments = async (cselected, tselected) => {
  const db = getFirestore();
  let q = collection(db, 'products');
  if (cselected) {
    q = query(q, where('category', '==', cselected));
  }
  if (tselected) {
    q = query(q, where('purchaseType', '==', tselected));
  }
  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });
  return results;
};

const LandingPage = ({ navigation }) => {

  const[cselected, setcSelected] = useState("");
  const[tselected, settSelected] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const results = await searchDocuments(cselected, tselected);
    setSearchResults(results);
    console.log(results);
  };


 
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
          onValueChange={(value) => settSelected(value)}
        >
          <Picker.Item label="Select a Purchase Type" value="" />
          <Picker.Item label="Rent" value="rent" />
           <Picker.Item label="Buy" value="buy" />
        </Picker>
          
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleSearch}>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: '500'}}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={Card}
        contentContainerStyle={{ flexGrow: 1 }}
      />
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
  card: {
    height,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    justifyContent: 'space-between'
  },
});

export default LandingPage;




