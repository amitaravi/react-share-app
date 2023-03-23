import firebase from './firebase';

class FirebaseService {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  // Firebase Auth methods
  signUpWithEmail = async (email, password) => {
    try {
      const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  signInWithEmail = async (email, password) => {
    try {
      const { user } = await this.auth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  signOut = async () => {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw error;
    }
  };

  // Firestore methods
  getProducts = async () => {
    try {
      const products = [];
      const querySnapshot = await this.db.collection('products').get();

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return products;
    } catch (error) {
      throw error;
    }
  };


  
  addProduct = async (product, user) => {
    try {
      const productsRef = firebase.firestore().collection('products');
      const docRef = await productsRef.add({
        ...product,
        addedBy: user.uid, // Add a new field representing the user who added the product
      });
      return docRef.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // Add more Firestore methods here based on your requirements
  
}

export default new FirebaseService();
