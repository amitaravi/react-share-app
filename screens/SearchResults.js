import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
//import { firebase } from '@firebase/app';
//import '@firebase/firestore';

const SearchResults = ({ route }) => {
  const { category, purchaseType } = route.params;
  const [products, setProducts] = useState([]);

 /* useEffect(() => {
    const db = firebase.firestore();
    const productsRef = db.collection('products');

    // Filter products by category and purchaseType
    productsRef
      .where('category', '==', category)
      .where('purchaseType', '==', purchaseType)
      .get()
      .then((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setProducts(results);
      })
      .catch((error) => {
        console.log('Error getting products:', error);
      });
  }, [category, purchaseType]);

  return (
    <View>
      <Text>Search Results</Text>
     <FlatList
        data={products}
        renderItem={({ item }) => (
          <View>
            
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};*/
return (<View><Text>Search Results</Text></View>);};

export default SearchResults;
