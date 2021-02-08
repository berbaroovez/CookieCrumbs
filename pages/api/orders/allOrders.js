import { auth } from "@/lib/firebase-admin";
import { getAllBakerOrders } from "@/lib/db-admin";
import { compareDesc, parse, parseISO } from "date-fns";
export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const orders = await getAllBakerOrders(uid);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
};
