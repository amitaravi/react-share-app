import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { collection, addDoc, orderBy, query, where, onSnapshot, doc, limit, setDoc } from 'firebase/firestore';
import { auth, db } from '../index';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);

    const route = useRoute();
    const { sellerId, buyerId } = route.params;
    console.log('sellerId:', sellerId);
    console.log('buyerId:', buyerId);

    useLayoutEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            const chatsRef = collection(db, "chats");
            const queryRef = query(
              chatsRef,
              where("participants", "==", [buyerId, sellerId]),
              limit(1)
            );
      
            const unsubscribe = onSnapshot(queryRef, async (snapshot) => {
              if (snapshot.empty) {
                // no chat document exists for this seller/buyer pair, create a new document
                const newChatRef = doc(chatsRef);
                const newChatData = {
                  participants: [buyerId, sellerId],
                  createdAt: new Date(),
                };
                await setDoc(newChatRef, newChatData);
                setChatId(newChatRef.id);
              } else {
                // retrieve the existing chat document
                setChatId(snapshot.docs[0].id);
              } 
            });
      
            return () => {
              unsubscribe();
            };
          }
        });
      }, []);

    useEffect(() => {
        if (chatId) {
        // subscribe to the messages collection of the chat document
        const chatRef = doc(db, "chats", chatId);
        const messagesRef = collection(chatRef, "messages");
        const queryRef = query(messagesRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            setMessages(
            snapshot.docs.map((doc) => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            })).reverse() // reverse the order to display messages chronologically
            );
        });

        return () => unsubscribe();
        }
    }, [chatId]);

    const onSend = useCallback((messages = []) => {
        const { sellerId, buyerId } = route.params;

        // add the message to the messages collection of the chat document
        const chatRef = doc(db, "chats", chatId);
        const messagesRef = collection(chatRef, "messages");
        const {_id, createdAt, text, user} = messages[0];

        addDoc(messagesRef, {
        _id,
        createdAt: new Date(createdAt),
        text,
        user
        });

        // update the last modified timestamp of the chat document
        setDoc(chatRef, {
        lastModifiedAt: new Date()
        }, { merge: true });

        // update the messages state
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, [chatId]);

    if (!chatId) {
        // loading indicator
        return <ActivityIndicator />;
    }

    return (
        <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
            _id: auth.currentUser.email,
            avatar: 'https://i.pravatar.cc/300',
        }}
        messagesContainerStyle={{
            backgroundColor: '#fff',
        }}
        />
    );
};

export default Chat;
