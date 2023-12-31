import React from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet,  TouchableOpacity } from 'react-native';
// import {} from 'react-native-gesture-handler';
import COLORS from '../src/consts/colors';
import {auth} from '../index';

const ProductDescription = ({navigation, route}) => {
  const plant = route.params;
  console.log(plant);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.imageContainer}>
          {
            plant.imageUri && (
              <Image source={{ uri: plant.imageUri }} style={{resizeMode: 'contain', flex: 1, width: '100%', height: '100%'}} />

            )
          }

      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold',  color: '#555555'}}>{plant.name}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              
              }}>
              ${plant.price}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',color: COLORS.purple}}>About</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}>
            {plant.description}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
          
          <TouchableOpacity style={style.buyBtn} onPress={() => navigation.navigate('ChatBot', { sellerId: plant.email, buyerId: auth.currentUser.email })}>
                <Text  style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Contact Seller</Text>
              </TouchableOpacity>
    
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.5,
    marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 200,
    height: 50,
    backgroundColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 5
  },
  priceTag: {
    backgroundColor: COLORS.purple,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default ProductDescription;
