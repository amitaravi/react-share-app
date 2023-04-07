import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, onSnapshot,} from 'firebase/firestore';
import { auth, db } from '../index';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ChatScreen = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            const chatsRef = collection(db, "chats");
            const queryRef = query(
            chatsRef,
            where("participants", "array-contains", user.uid),
            );

            onSnapshot(queryRef, (snapshot) => {
            const chats = snapshot.docs.map((doc) => ({
                id: doc.id,
                participants: doc.data().participants,
                createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
                lastModifiedAt: doc.data().lastModifiedAt ? doc.data().lastModifiedAt.toDate() : null,
                lastMessage: doc.data().lastMessage,
            })).sort((a, b) => b.lastModifiedAt - a.lastModifiedAt);
            setParticipants(snapshot.docs.map((doc) => doc.data().participants));
            console.log(participants);
            setChats(chats);
            setLoading(false);
            });
        }
    });
        
    return () => unsubscribe();
    }, []);

    const navigation = useNavigation();

    const handleChatPress = useCallback((chatId, participants) => {
        navigation.navigate('ChatBot', { chatId, buyerId: participants[0], sellerId: participants[1]});
    }, [navigation]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleChatPress(item.id, item.participants)}>
        <View style={{borderWidth: 1, padding: 10, borderRadius: 10}}>
        <Text style={styles.itemText}>{item.participants[0] === auth.currentUser.uid ? item.participants[1] : item.participants[0]}</Text>
        <Text style={styles.itemText}>{item.lastMessage ? item.lastMessage.text : ''}</Text>

        </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator />
        </View>
        );
    }

    if (chats.length === 0) {
        return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You have no chats yet</Text>
        </View>
        );
    }

    return (
        <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey',
    },
    listContainer: {
        padding: 16,
    },
    itemContainer: {
        marginBottom: 16,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey', 
       
    },
});

export default ChatScreen;
