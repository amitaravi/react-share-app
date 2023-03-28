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
import plants from '../src/consts/plants';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 



const height = Dimensions.get('window').height/1.5;
const width = Dimensions.get('window').width/1.1

// const searchDocuments = async (cat, type) => {
//   console.log("hello");
//   const db = getFirestore();
//   let q = collection(db, 'products');
//   if (cat) {
//     q = query(q, where('category', '==', cat));
//   }
//   if (type) {
//     q = query(q, where('purchaseType', '==', type));
//   }
//   const querySnapshot = await getDocs(q);
//   const results = [];
//   querySnapshot.forEach((doc) => {
//     results.push({ id: doc.id, ...doc.data() });
//   });
//   return results;
// };


const SearchProducts = ({route,navigation}) => {
 
 const{cat, type} = route.params;
 console.log(cat);
 console.log(type);
 const[products, setProducts] = useState([]);
 const db = getFirestore();
  let q = collection(db, 'products');
  const results = [];

 useEffect(() => {
   if (cat) {
    q = query(q, where('category', '==', cat));
  }
  if (type) {
    q = query(q, where('purchaseType', '==', type));
  }
 getDocs(q).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });
  // setProducts(results);
  console.log(results);
 }).catch((error) => {console.log("Error getting products:",error);

});
 
}, []);

 const Card = ({product}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDescription', product)}>
        <View style={style.card}>
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
            <Image
              source={product.imageUri}
              style={{flex: 1, resizeMode: 'contain'}}
            />
          </View>
          <View 
           style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
            {product.name}
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold'}}>
              ${product.price}
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
      <View>
        {products.length != 0 &&
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
        data={results}
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      /> 
        }
      </View>
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
