//All database requests that are made from client side

import firebase from "./firebase";
const app = firebase.app();
const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true }); // we add the user id and all the data to their profile
}

export function submitOrder(data) {
  return firestore.collection("orders").add(data);
}

export function updateOrder(id, data) {
  return firestore.collection("orders").doc(id).update(data);
}
