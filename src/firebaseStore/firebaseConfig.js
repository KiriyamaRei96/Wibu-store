import { initializeApp } from "firebase/app";
import { doc, getFirestore, query, setDoc, where } from "firebase/firestore";
import { collection, getDocs, addDoc, getDoc } from "firebase/firestore";

import "firebaseui/dist/firebaseui.css";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";

export const firebaseConfig = {
  apiKey: "AIzaSyBbdh0aQ5mHNeRTVzqdz6uAsC_qkzAxE7Y",
  authDomain: "konoha-supermarket.firebaseapp.com",
  projectId: "konoha-supermarket",
  storageBucket: "konoha-supermarket.appspot.com",
  messagingSenderId: "303908444231",
  appId: "1:303908444231:web:e7ab49a1529f0db6d27962",
  measurementId: "G-GSLGXQHWGM",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// set user data function
export const setUserData = (loginDispach, cartDispach, navigate) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      (async () => {
        const querySnapshot = query(
          collection(db, "user"),
          where("id", "==", user.uid)
        );
        const resData = await getDocs(querySnapshot);
        const userData = resData.docs;
        if (userData.length > 0) {
          const data = userData.map((doc) => doc.data())[0];

          loginDispach({
            userInfo: JSON.parse(data.userInfo),
            userID: user.uid,
            userHistory:
              data.userHistory !== undefined
                ? JSON.parse(data.userHistory)
                : [],
          });
        }
        if (userData.length === 0) {
          loginDispach({
            userInfo: {
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
              andress: undefined,
              phone: undefined,
            },
            userID: user.uid,
            userHistory: [],
          });

          if (!document.location.href.includes("user-info/info-from")) {
            navigate();
          }
        }
      })();

      // set cart data

      (async () => {
        const querySnapshot = query(
          collection(db, "userCart"),
          where("id", "==", user.uid)
        );
        const resData = await getDocs(querySnapshot);
        const cartData = resData.docs.map((doc) => doc.data())[0];

        const cartLocalStorage = localStorage.getItem("localCart");

        if (cartData) {
          if (
            cartLocalStorage === null ||
            JSON.parse(cartLocalStorage).length === 0
          ) {
            cartDispach(JSON.parse(cartData.cart));
          }
        }
        if (!cartData) {
          if (
            cartLocalStorage === null ||
            JSON.parse(cartLocalStorage).length === 0
          ) {
            try {
              const docRef = await setDoc(doc(db, "userCart", user.uid), {
                cart: JSON.stringify([]),
                id: user.uid,
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
          if (
            cartLocalStorage !== null &&
            JSON.parse(cartLocalStorage).length > 0
          ) {
            try {
              const docRef = await setDoc(doc(db, "userCart", user.uid), {
                cart: cartLocalStorage,
                id: user.uid,
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
        }
      })();
    }
  });
};
// update cartData function

export const updateCartData = async (data) => {
  const userStt = auth.currentUser;

  const updateCart = [...data.itemCart];

  if (userStt) {
    try {
      await setDoc(doc(db, "userCart", userStt.uid), {
        cart: JSON.stringify(updateCart),
        id: userStt.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};

// update user data;
export const updateUserData = async (data) => {
  const userStt = auth.currentUser;
  if (userStt) {
    updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: data.avatar,
    });
    try {
      await setDoc(doc(db, "user", userStt.uid), {
        userInfo: JSON.stringify(data),
        id: userStt.uid,
        userHistory: JSON.stringify([]),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};
// update user history
export const updateUserHistory = async (data) => {
  const userStt = auth.currentUser;
  if (userStt) {
    const querySnapshot = query(
      collection(db, "user"),
      where("id", "==", userStt.uid)
    );
    const resData = await getDocs(querySnapshot);
    const userData = resData.docs;
    const userInfo = userData.map((doc) => doc.data())[0];

    const userHistory = userData.map((doc) => doc.data())[0].userHistory;
    if (userHistory) {
      try {
        await setDoc(doc(db, "user", userStt.uid), {
          ...userInfo,
          userHistory: JSON.stringify([...JSON.parse(userHistory), data]),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    if (!userHistory) {
      try {
        await setDoc(doc(db, "user", userStt.uid), {
          ...userInfo,
          userHistory: JSON.stringify([data]),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
};
