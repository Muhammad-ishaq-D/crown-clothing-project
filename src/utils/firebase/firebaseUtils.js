// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAum1hB_prlkGiLVxu7NFXdDaN2I-KKxEY",
//   authDomain: "crwn-clothing-db-4307b.firebaseapp.com",
//   projectId: "crwn-clothing-db-4307b",
//   storageBucket: "crwn-clothing-db-4307b.firebasestorage.app",
//   messagingSenderId: "765384007931",
//   appId: "1:765384007931:web:88ed2ecf7b36409949905e"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAum1hB_prlkGiLVxu7NFXdDaN2I-KKxEY",
  authDomain: "crwn-clothing-db-4307b.firebaseapp.com",
  projectId: "crwn-clothing-db-4307b",
  storageBucket: "crwn-clothing-db-4307b.appspot.com", // ✅ FIXED
  messagingSenderId: "765384007931",
  appId: "1:765384007931:web:88ed2ecf7b36409949905e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
}); 

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); // We can also use this method for sign in like sign in popup.

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    // create the collection in DB.
    const collectionRef = collection(db, collectionKey);
    // use Batch for successful transaction to track all the collections stores in DB successfully.
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    
    await batch.commit();
    // console.log("done");
};

//retrive now all data from firestore after storing.
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    // use query to get object so we can get actuall data through it by getDocs.
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data()) 
 //   const categoryMap = querySnapshot.docs 
//     .reduce((acc, docSnapshot) => {
//         const{ title, items } = docSnapshot.data();
//         acc[title.toLowerCase()] = items;
//         return acc;
//     }, {});

//     return categoryMap; 
};

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {    //we can avoid null in value of display name inside user object like additionalInfo{Name:'mike'}
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);   

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot.exists());
    
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
    
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInfo
            });
        } catch (error) {
            console.log('error creating the user', error)
        }
    }

    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth);

export const onAuthChangeListner = (callback) => onAuthStateChanged(auth, callback);


// Asysnchronous stream(click stream ) of listner when subscribe (also use for subscriptions)
// => next: callback,             //this method will be called when subscribe 
// => error: errorcallback,
// => complete: completecallback   // will cleanup/ when unsubscribe.

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
}; 