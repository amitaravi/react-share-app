import React,{useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from '../src/consts/colors';
import { collection, query, where, getDocs , arrayRemove, setDoc, doc, updateDoc} from 'firebase/firestore';
import {db,auth} from '../index';

const height = Dimensions.get('window').height/1.5;
const width = Dimensions.get('window').width/1.1

const SearchProducts = ({navigation, route}) => {

  const{category, type} = route.params;
  console.log(category);
  const[data,setData] = useState([]);
  const[favorites,setFavorites] = useState(false);

  useEffect(() => {
    const fetchData = async(category, type) => {
      let q = collection(db, 'products');
      if (category) {
        q = query(q, where('category', '==', category));
      }
      if (type) {
        q = query(q, where('purchaseType', '==', type));
      }
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setData(results);
    }
    fetchData(category, type);
  }, [category, type])

  const handleChange = (pid) => {
    setFavorites(!favorites);
    if(!favorites){
      handleAddToFavorites(pid);
    } else{
      removeFavorite(pid);
    }
  }

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
  };

  const handleAddToFavorites = (product) => {
    // Add product to favorites of current user in Firebase Firestore
  
    console.log('1');
    const user = auth.currentUser;
    console.log('2');
    // collection(db, 'users').document(user.uid).updateDoc({
    //   favorites: firebase.firestore.FieldValue.arrayUnion(productId)
    // })
    const userRef = doc(db, "users", user.uid);
    // updateDoc(userRef, {
    //   favorites: arrayUnion(productId)
    // })
    setDoc(userRef, {
      favorites: [product]
    }, { merge: true })
     .then(() => console.log('Product added to favorites'))
     .catch(error => console.log(error));
  }

 const Card = ({plant}) => {

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDescription', plant)}>
        <View style={style.card}>
          <TouchableOpacity onPress={() => handleChange(plant)}>
          <View style={{alignItems: 'flex-end'}}>
             {
                favorites ? <Icon
                name="heart"
                size={18}
                color={COLORS.red}
              />: 
             <Icon
                name="hearto"
                size={18}
                color={COLORS.black}
              />

             }
          </View>


          </TouchableOpacity>
          <View
            style={{
              height: '80%'
            }}>
              {
                plant.imageUri && (
                  <Image
                  source={{ uri: plant.imageUri }}
                  style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                />

                )
              }
          </View>
          <View 
           style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
            {plant.name}
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold'}}>
              ${plant.price}
            </Text>
         
           
          
            </View>
          </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
       <View style={style.header}>
          <Text style={{fontSize: 30, color: COLORS.purple, fontWeight: 'bold'}}>
            Here you go!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
           <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'rgba(0,0,0,0.2) ',
              }}>
              <Icon
                name="heart"
                size={18}
                color={COLORS.dark}
              />
            </View>
      </TouchableOpacity>
      </View>
      <FlatList 
         horizontal
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        numColumns={1}
        data={data}
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({

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
export default SearchProducts;
