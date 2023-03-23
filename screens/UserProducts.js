import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const UserProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const productsRef = firebase.firestore().collection('products');
      const query = productsRef.where('addedBy', '==', user.uid);
      query.onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setProducts(data);
      });
    }
  }, []);

  const handleEditProduct = (product) => {
    navigation.navigate('EditProductScreen', { product });
  };

  const handleDeleteProduct = (product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete ${product.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            firebase.firestore().collection('products').doc(product.id).delete();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity>
      <View style={{ flexDirection: 'row', padding: 16 }}>
        <Image source={{ uri: item.imageUri }} style={{ width: 50, height: 50, marginRight: 16 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>{item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => handleEditProduct(item)}>
          <Text style={{ color: 'blue', marginRight: 16 }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteProduct(item)}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>No products added yet</Text>}
      />
    </View>
  );
};

export default UserProductsScreen;
