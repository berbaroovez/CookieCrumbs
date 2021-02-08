import { auth } from "@/lib/firebase-admin";
import { getPendingOrders } from "@/lib/db-admin";

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const orders = await getPendingOrders(uid);
    console.log(orders.orderList);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
};
