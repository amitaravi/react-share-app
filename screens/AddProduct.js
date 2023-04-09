import React, { useCallback, useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../index';


const AddProduct = ({navigation}) => {
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
    const db = getFirestore();
    const productsCollectionRef = collection(db, 'products');
    
    try {
      // Upload the image to Firebase Storage
      console.log("1")  
      const storageRef = ref(getStorage(), `product-images/${Date.now()}`);
      console.log("2")
      await uploadBytes(storageRef, product.imageUri);
  
      // Get the image URL from Firebase Storage
      const imageUri = await getDownloadURL(storageRef);
  
      // Save the product data in Firestore
      const docRef = await addDoc(productsCollectionRef, {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        purchaseType: product.purchaseType,
        imageUri: imageUri,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        email: user.email,
      });
      console.log(`Product added with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleAddProduct = async () => {
    const response = await fetch(pickerResponse.assets[0].uri);
    const imageBlob = await response.blob();
    
    const product = {
      name: productName,
      price: Number(productPrice),
      description:productDescription,
      category: productCategory,
      purchaseType:  productPurchaseType,
      imageUri: imageBlob,
    };
    console.log(product);
    const user = getAuth().currentUser;
    addProduct(product, user);
    navigation.navigate('LandingPage');

  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <SafeAreaView style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.gradient}>
      <View style={styles.container}>
     
        <Text style={styles.titlee}>Product Name</Text>
      <TextInput style={styles.input} placeholder="" value={productName} onChangeText={setProductName} />
      <Text style={styles.titlee}>Choose Image</Text>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={onImageLibraryPress}>
        <Image
           style={styles.avatarImage}
           source={uri ? { uri } : require('../src/assets/imagePicker.png')}
         />

        </TouchableOpacity>
         {/* <TouchableOpacity style={styles.addButton} onPress={onImageLibraryPress}>
            <Image style={styles.addButtonIcon} source={require('../src/assets/addIcon.png')} />
         </TouchableOpacity> */}
      </View>
        
          {/* <View style={styles.buttonContainer}>
             <Button title="Choose Image" onPress={handleChooseImage} />
      {productImage && <Image source={{ uri: productImage.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Add Product" onPress={handleAddProduct} />
        
        </View> */}

 <Text style={[styles.title, { marginBottom: 10 }]}>Category</Text>
 <Picker style={{ borderRadius: 10, borderWidth: 1, borderColor: 'black', color:'black'} } selectedValue={productCategory}
        onValueChange={(itemValue) => setProductCategory(itemValue)} dropdownIconColor={'black'}
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
      
      <Picker style={{ borderRadius: 10, color:'black' }}
        selectedValue={productPurchaseType}
        onValueChange={(itemValue) => setProductPurchaseType(itemValue)} dropdownIconColor={'black'}
      >
        <Picker.Item label="Select a Purchase Type" value="" />
        <Picker.Item label="Rent" value="rent" />
        <Picker.Item label="Buy" value="buy" />
        <Picker.Item label="Give" value="give" />
      </Picker>
     
      
         <TouchableOpacity style={styles.buttonContainer} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
    
 </View>
    </ScrollView>
    </SafeAreaView>
     
  );
};
const styles = StyleSheet.create({
    gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#bca0dc',
  },
  container: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  input:{
  color: 'black',
  marginBottom: 20,
  marginTop: 10,
  backgroundColor: '#fff',
  borderRadius: 5,
  paddingLeft: 10,
  paddingRight: 10,
  borderColor: 'black',
  borderWidth: 1
  },

  titlee:{
    fontSize: 16,  
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black'
    },
  title: {
    fontSize: 16,
    
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black'
    
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
  color: '#bca0dc'
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
  padding: 15,
  alignSelf:'center'
},
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17
  },
  avatarImage: {
    height: 150,
    width: 150,
    overflow: 'hidden',
  },
  addButton: {
    height: 24,
    width: 24,
    borderRadius: 50,
  },
  addButtonIcon: {
    height: 24,
    width: 24,
  },
});
export default AddProduct;