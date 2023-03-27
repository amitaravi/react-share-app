import React, { useCallback, useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import {collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
import { db, auth } from '../index';


const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPurchaseType, setProductPurchaseType] = useState('');
  const [productImage, setProductImage] = useState(null);
  const[pickerResponse, setPickerResponse] = useState(null);

  // const handleChooseImage = () => {
  //   const options = {
  //     title: 'Select Product Image',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.uri) {
  //       setProductImage(response);
  //     }
  //   });
  // };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const addProduct = async (product, user) => {
    // const db = getFirestore(app);
    // const productsCollectionRef = ;
  
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        purchaseType: product.purchaseType,
        // imageUri: product.imageUri,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });
      console.log(`Product added with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding product:', error);

    }
  };

  const handleAddProduct = () => {
    const product = {
      name: productName,
      price: productPrice,
      description:productDescription,
      category: productCategory,
      purchaseType:  productPurchaseType,
      // imageUri: pickerResponse.assets[0].uri,
    };
    console.log(product);
    const user = auth.currentUser;
    console.log(user.uid);
    addProduct(product, user);

  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <SafeAreaView style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.gradient}>
    <Text style={styles.heading}>Upload Product</Text>
      <View style={styles.container}>
     
        <Text style={styles.titlee}>Product Name</Text>
      <TextInput style={styles.input} placeholder="" value={productName} onChangeText={setProductName} />
      {/* <Text style={styles.titlee}>Choose Image</Text>
      <View style={{alignItems:'center'}}>
      <Image
           style={styles.avatarImage}
           source={uri ? { uri } : require('../src/assets/imagePicker.png')}
         />
         <TouchableOpacity style={styles.addButton} onPress={onImageLibraryPress}>
            <Image style={styles.addButtonIcon} source={require('../src/assets/addIcon.png')} />
         </TouchableOpacity>
      </View> */}
        
          {/* <View style={styles.buttonContainer}>
             <Button title="Choose Image" onPress={handleChooseImage} />
      {productImage && <Image source={{ uri: productImage.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Add Product" onPress={handleAddProduct} />
        
        </View> */}

 <Text style={[styles.title, { marginBottom: 10 }]}>Category</Text>
 <Picker style={{ borderRadius: 10} } selectedValue={productCategory}
        onValueChange={(itemValue) => setProductCategory(itemValue)}
      >
        <Picker.Item label="Select a Category" value="" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Clothing" value="clothing" />
        <Picker.Item label="Home and Garden" value="home-and-garden" />
        <Picker.Item label="Beauty and Personal Care" value="beauty-and-personal-care" />
      </Picker>
  <Text style={styles.title}>Price</Text>
      <TextInput placeholder="" value={productPrice} onChangeText={setProductPrice} style={styles.input} />
        
        
        <Text style={styles.title}>Description</Text>
      <TextInput placeholder="" value={productDescription} onChangeText={setProductDescription} style={[styles.input, {height: 80}]} multiline={true}
  numberOfLines={4} />
      <Text style={[styles.title, { marginBottom: 10 }]}>Purchase Type</Text>
      
      <Picker style={{ borderRadius: 10 }}
        selectedValue={productPurchaseType}
        onValueChange={(itemValue) => setProductPurchaseType(itemValue)}
      >
        <Picker.Item label="Select a Purchase Type" value="" />
        <Picker.Item label="Rent" value="rent" />
        <Picker.Item label="Buy" value="buy" />
      </Picker>
     
       <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
        </View>
 </View>
    </ScrollView>
    </SafeAreaView>
     
  );
};
const styles = StyleSheet.create({
    gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bca0dc',
  },
  container: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  input:{

  marginBottom: 20,
  marginTop: 10,
  backgroundColor: '#fff',
  borderRadius: 5,
  paddingLeft: 10,
  paddingRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    
    justifyContent: 'center',
    marginLeft: 70,
    marginRight: 70,
  },
  titlee:{
    fontSize: 16,  
    fontWeight: 'bold',
    marginTop: 20
    },
  title: {
    fontSize: 16,
    
    fontWeight: 'bold',
    marginTop: 20,
    
  },
 button: {
    marginTop:20,
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    marginBottom: 30
   
  },
  heading: {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 20,
  marginLeft:30,
  color:'white',
  alignSelf: 'flex-start', // Align to the left
},
  buttonText: {
    color: 'black',
 
    fontWeight: 'bold',
  },
  avatarImage: {
    height: 150,
    width: 150,
    overflow: 'hidden',
  },
  addButton: {
    height: 24,
    width: 24,
    backgroundColor: '#f2f2fC',
    borderRadius: 50,
  },
  addButtonIcon: {
    height: 24,
    width: 24,
  },
});
export default AddProduct;