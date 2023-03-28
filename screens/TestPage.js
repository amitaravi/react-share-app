import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const searchDocuments = async (searchQuery, category) => {
  const db = getFirestore();
  let q = collection(db, 'products');
  if (searchQuery) {
    q = query(q, where('name', '>=', searchQuery));
  }
  if (category) {
    q = query(q, where('category', '==', category));
  }
  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });
  return results;
};

const SearchPage = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const[searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const results = await searchDocuments(searchQuery, category);
    setSearchResults(results);
  };

  const renderItem = ({ item }) => (
   
        <View style={styles.item}>
      {item.imageUri && (
         <TouchableOpacity onPress={() => navigation.navigate('ProductDescription', item)}>
          <Image source={{ uri: item.imageUri }} style={{ width: 50, height: 50 }} />
         </TouchableOpacity>
        
      )}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.category}>{item.price}</Text>
    </View>

  );

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10, fontSize: 15 }}>Category:</Text>
        <Picker
          style={styles.picker}
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Clothing" value="clothing" />
          <Picker.Item label="Home and Garden" value="home-and-garden" />
          <Picker.Item label="Beauty and Personal Care" value="beauty-and-personal-care" />
        </Picker>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10 }}>Type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={type}
          onValueChange={(value) => setType(value) }
        >
        <Picker.Item label="Select a Purchase Type" value="" />
        <Picker.Item label="Rent" value="rent" />
        <Picker.Item label="Buy" value="buy" />
         <Picker.Item label="Give" value="give"/>
        </Picker>
      </View>
      <TouchableOpacity onPress={handleSearch} style={{width: '30%', alignSelf: 'center', padding: 10, borderRadius: 15, backgroundColor: '#BCA0DC', marginBottom: 30}}>
        <Text style={{fontSize: 15, alignSelf: 'center', color: '#fff'}}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  category: {
    fontStyle: 'italic',
  },
});

export default SearchPage;