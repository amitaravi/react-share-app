import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../src/consts/colors';
import plants from '../src/consts/plants';
import {auth, db} from '../index';
import {  arrayRemove, doc, getDocs, collection, updateDoc } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const width = Dimensions.get('window').width / 2 - 30;

const Favorites = ({navigation}) => {
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products from Firebase Firestore
    if(isFocused){
      getDocs(collection(db, 'users'))
      .then(snapshot => {
        // const productsArray = [];
        snapshot.forEach(doc => {
          const product = doc.data();
          product.id = doc.id;
          if(product.id == auth.currentUser.uid){
            console.log(product.favorites);
            setProducts(product.favorites);
           }
        });
        // setProducts(productsArray);
      })
      .catch(error => console.log(error));

    }
  }, [isFocused]);

  const removeFavorite = (product) => {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, {
      favorites: arrayRemove(product)
    })
      .then(() => {
        console.log('Product removed from favorites!');
      })
      .catch((error) => {
        console.error('Error removing product from favorites: ', error);
      });

      getDocs(collection(db, 'users'))
      .then(snapshot => {
        // const productsArray = [];
        snapshot.forEach(doc => {
          const product = doc.data();
          product.id = doc.id;
          if(product.id == auth.currentUser.uid){
            console.log(product.favorites);
            setProducts(product.favorites);
           }
        });
        // setProducts(productsArray);
      })
      .catch(error => console.log(error));
      
  };

  const Card = ({plant}) => {

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDescription', plant)}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}

              onPress = {() => removeFavorite(plant)}
              >
              <Icon
                name="delete"
                size={18}
                color="#bca0dc"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
              {
                plant.imageUri && 
                <Image
                source={{ uri: plant.imageUri }}
                style={{flex: 1, resizeMode: 'contain', width: 100, height: 100, borderRadius: 20}}
              />
              }
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10, color: 'grey', alignSelf: 'center'}}>
            {plant.name}
          </Text>
         
            <Text style={{fontSize: 19, fontWeight: 'bold', color: 'grey', alignSelf:'center'}}>
              ${plant.price}
            </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    products.length != 0 &&
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={products}
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Favorites;

