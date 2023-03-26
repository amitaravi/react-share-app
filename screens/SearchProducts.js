import React from 'react';
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

const height = Dimensions.get('window').height/1.5;
const width = Dimensions.get('window').width/1.1

const SearchProducts = ({navigation}) => {
 
 const Card = ({plant}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductDescription', plant)}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end'}}>
             {
                plant.like ?  <Icon
                name="hearto"
                size={18}
                color={COLORS.black}
              /> :
              <Icon
              name="heart"
              size={18}
              color={COLORS.red}
            />

             }
          </View>

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={plant.img}
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
        data={plants}
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
