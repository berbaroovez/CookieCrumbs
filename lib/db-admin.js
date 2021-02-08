//All database request that are made from server side

import { db } from "./firebase-admin";
import { compareDesc, parseISO } from "date-fns";
export async function getAllBakers() {
  const snapshot = await db.collection("users").get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return { sites };
}

export async function getBakeryName(bakerId) {
  try {
    const snapshot = await db
      .collection("users")
      .where("uid", "==", bakerId)
      .get();

    const bakerList = [];
    snapshot.forEach((doc) => {
      bakerList.push({ id: doc.id, ...doc.data() });
    });

    return { bakerList };
  } catch (err) {
    return err;
  }
}

export async function getAllOrders() {
  const snapshot = await db.collection("orders").get();
  const orders = [];
  snapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() });
  });

  return { orders };
}

export async function getPendingOrders(bakerId) {
  try {
    const snapshot = await db
      .collection("orders")
      .where("bakerId", "==", bakerId)
      .where("status", "==", "Pending")
      .get();

    const orderList = [];
    snapshot.forEach((doc) => {
      orderList.push({ id: doc.id, ...doc.data() });
    });

    orderList.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );
    return { orderList };
  } catch (err) {
    return err;
  }
}

export async function getAllBakerOrders(bakerId) {
  try {
    const snapshot = await db
      .collection("orders")
      .where("bakerId", "==", bakerId)
      .get();

    const orderList = [];
    snapshot.forEach((doc) => {
      orderList.push({ id: doc.id, ...doc.data() });
    });

    return { orderList };
  } catch (err) {
    return err;
  }
}

export async function getOrder(orderId) {
  try {
    const snapshot = await db.collection("orders").doc(orderId).get();

    const order = {
      id: snapshot.id,
      ...snapshot.data(),
    };
    return { order };
  } catch (err) {
    return err;
  }
}

export async function getUserInfo(userId) {
  try {
    const snapshot = await db.collection("users").doc(userId).get();

    return { ...snapshot.data() };
  } catch (err) {
    return err;
  }
}
