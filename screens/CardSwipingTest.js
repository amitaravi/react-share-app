import React, { useState, useEffect } from 'react';
import SwipeCards from 'react-native-swipe-cards';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import COLORS from '../src/consts/colors';
import { collection, query, where, getDocs , arrayRemove, setDoc, doc, updateDoc, getDoc} from 'firebase/firestore';
import {db,auth} from '../index';
import { LogBox } from 'react-native';


  const handleAddToFavorites = async (product) => {
    // Add product to favorites of current user in Firebase Firestore
  
    console.log('1');
    const user = auth.currentUser;
    console.log('2');
    // collection(db, 'users').document(user.uid).updateDoc({
    //   favorites: firebase.firestore.FieldValue.arrayUnion(productId)
    // })
    const userRef = doc(db, "users", user.uid);

    const addUserIfNotExists = async () => {
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        const initialData = {
          favorites: [],
        };
        await setDoc(userRef, initialData);
        console.log("User document created.");
      } else {
        console.log("User document already exists.");
      }
    };

    await addUserIfNotExists();
    
    // updateDoc(userRef, {
    //   favorites: arrayUnion(productId)
    // })
    const docSnap = await getDoc(userRef)

    const existingFavorites = docSnap.data().favorites || [];
    const updatedFavorites = [...existingFavorites, product];

    if(existingFavorites.length == 0){
        setDoc(userRef, { favorites: updatedFavorites }, { merge: true })
        .then(() => console.log('Product added to favorites'))
        .catch(error => console.log(error));
    }
    else{
        const exists = existingFavorites.find(item => item.name === product.name);
        console.log(exists);
        if(!exists){
            setDoc(userRef, { favorites: updatedFavorites }, { merge: true })
            .then(() => console.log('Product added to favorites'))
            .catch(error => console.log(error));  
            }
        else{
            console.log("Product is already in favorites")
        }
    }
  }


const SwipingCards = ({route, navigation}) => {

    const{category, type} = route.params;
    const[data,setData] = useState([]);

    const Card = ({ card}) => {
        return (
          <TouchableOpacity style={styles.card}  onPress={() => navigation.navigate('ProductDescription', card)}>
            <Image source={{ uri: card.imageUri }} style={styles.cardImage} />
            <Text style={styles.cardText}>{card.name}</Text>
            <Text style={styles.cardText}>${card.price}</Text>
          </TouchableOpacity>
        );
      };

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
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

    const [cardIndex, setCardIndex] = useState(0);
  
    const handleYup = (card) => {
      setCardIndex(cardIndex + 1);
      handleAddToFavorites(card);
    };
  
    const handleNope = () => {
      setCardIndex(cardIndex + 1);
    };
  
    const renderCard = (card) => {
        console.log(card);
      return <Card card={card} />;
    };
  
    const renderNoMoreCards = () => {
      return (
        <View style={styles.noMoreCards}>
          <Text>No more cards</Text>
        </View>
      );
    };

    return (
      <SwipeCards
        cards={data}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        handleYup={handleYup}
        handleNope={handleNope}
        cardIndex={cardIndex}
        loop={false}
      />
    );
  };

  const styles = StyleSheet.create({
    card: {
      width: 300,
      height: 400,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardImage: {
      width: '100%',
      height: '80%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    cardText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
      color: 'black'
    },
    noMoreCards: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
export default SwipingCards;




