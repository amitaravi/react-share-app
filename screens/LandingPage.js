import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const LandingPage = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('electronics');
  const [purchaseType, setPurchaseType] = useState('rent');

  const handleSearch = () => {
    navigation.navigate('SearchResults', { category, purchaseType });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Search</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.dropdowns}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Category:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.dropdown}
          >
            <Picker.Item label="Electronics" value="electronics" />
            <Picker.Item label="Clothing" value="clothing" />
            <Picker.Item label="Home and Garden" value="home-and-garden" />
            <Picker.Item label="Beauty and Personal Care" value="beauty-and-personal-care" />
          </Picker>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Purchase Type:</Text>
          <Picker
            selectedValue={purchaseType}
            onValueChange={(value) => setPurchaseType(value)}
            style={styles.dropdown}
          >
            <Picker.Item label="Rent" value="rent" />
            <Picker.Item label="Sell" value="sell" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.collapseHeader}>
        <Text style={styles.collapseTitle}>My Products</Text>
        <AntDesign name="down" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.collapseContent}>
        <TouchableOpacity onPress={() => navigation.navigate('UserProducts')}>
          <Text style={styles.collapsibleText}>View My Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    width: '80%',
  },
  searchButton: {
    backgroundColor: '#1c8eff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  collapsibleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    width: '80%',
  },
  collapsibleIcon: {
    marginRight: 10,
  },
  collapsibleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    width: '45%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default LandingPage;




