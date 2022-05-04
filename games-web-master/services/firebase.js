import * as firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCMurwThYAcu0LSa4SmRiGwR1u6FoWnC-E",
    authDomain: "binar-platinum-9cfd1.firebaseapp.com",
    projectId: "binar-platinum-9cfd1",
    storageBucket: "binar-platinum-9cfd1.appspot.com",
    messagingSenderId: "1055081100536",
    appId: "1:1055081100536:web:7c7113d6d800ec28e3f70d",
    measurementId: "G-9LKT7MYXZ9"
};

const app = firebase.default.initializeApp(firebaseConfig)
const auth = app.auth();
const db = app.firestore();

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        throw new Error(err.message)
    }
};

const registerWithEmailAndPassword = async (username, email, password) => {
    try {
        let isExist = false;
        const q = query(collection(db, 'users'), where('username', '==', username));

        const snapShot = await getDocs(q)
        snapShot.forEach((doc) => {
            if (doc) {
                isExist = true;
            }
        })
        if (!isExist) {
            const res = await auth.createUserWithEmailAndPassword(email, password);
            const user = res.user;
            await setDoc(doc(db, "users", user.uid), {
                username,
                authProvider: "local",
                email,
            })
            alert('registration success');

        } else {
            alert('username already exists');
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

const fetchUserProfile = async () => {
    try {
        const user = await auth.currentUser;
        let uid = user.uid;
        const docRef = await doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return {
                email: docSnap.data().email,
                username: docSnap.data().username,
                bio: docSnap.data().bio,
                name: docSnap.data().name,
                profilePhoto: docSnap.data().profile_photo,
                playedGames: docSnap.data().played_games,
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error(err.message)
    }
}

const fetchCurrentUser = async () => {
    const user = await auth.currentUser;
    console.log("user", user)

    if (user) {
        console.log("user", user)
        return user;
    } else {
        throw new Error("noSession")
    }
};

const onAuthStateChanged = async () => {
    await auth.onAuthStateChanged((user) => {
        if (user) {
            return user;
        } else {
            throw new Error("invalidSession")
        }
    })
}


export {
    auth,
    db,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
    fetchUserProfile,
    fetchCurrentUser,
};