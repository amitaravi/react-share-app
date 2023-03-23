import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, Picker } from 'react-native';
import ImagePicker from 'react-native-image-picker';
//import FirebaseService from '../FirebaseService';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPurchaseType, setProductPurchaseType] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleChooseImage = () => {
    const options = {
      title: 'Select Product Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setProductImage(response);
      }
    });
  };

  const handleAddProduct = () => {
    const product = {
      name: productName,
      price: productPrice,
      description:productDescription,
      category: productCategory,
      purchaseType:  productPurchaseType,
      imageUri:productImage.uri,
    };
    const user = firebase.auth().currentUser;

const productId =FirebaseService.addProduct(product, user);
if (productId) {
  console.log(`Product added with ID: ${productId}`);
} else {
  console.log('Product add failed');
}

  };

  return (
    <View>
      <Text>Add Product</Text>
      <TextInput placeholder="Product Name" value={productName} onChangeText={setProductName} />
      <TextInput placeholder="Product Price" value={productPrice} onChangeText={setProductPrice} />
      <TextInput placeholder="Product Description" value={productDescription} onChangeText={setProductDescription} />
      <Picker
        selectedValue={productCategory}
        onValueChange={(itemValue) => setProductCategory(itemValue)}
      >
        <Picker.Item label="Select a Category" value="" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Clothing" value="clothing" />
        <Picker.Item label="Home and Garden" value="home-and-garden" />
        <Picker.Item label="Beauty and Personal Care" value="beauty-and-personal-care" />
      </Picker>
      <Picker
        selectedValue={productPurchaseType}
        onValueChange={(itemValue) => setProductPurchaseType(itemValue)}
      >
        <Picker.Item label="Select a Purchase Type" value="" />
        <Picker.Item label="Rent" value="rent" />
        <Picker.Item label="Buy" value="buy" />
      </Picker>
      <Button title="Choose Image" onPress={handleChooseImage} />
      {productImage && <Image source={{ uri: productImage.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

export default AddProduct;