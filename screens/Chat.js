import React,{ useState, useLayoutEffect, useCallback} from "react";
import {collection, addDoc, orderBy, query, onSnapshot} from 'firebase/firestore';
import {auth, db} from '../index';
import {GiftedChat} from "react-native-gifted-chat";

const Chat = () => {
    const[messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            console.log('snapshot');
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt,
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        });

        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const {_id, createdAt, text, user} = messages[0];
        addDoc(collection(db, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);
    return(
        <GiftedChat 
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
        }}messagesContainerStyle={{
            backgroundColor: '#fff'
        }}
        />
    )

}

export default Chat;