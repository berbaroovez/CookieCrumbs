import { auth } from "@/lib/firebase-admin";
import { getAllBakerOrders } from "@/lib/db-admin";
import { compareDesc, parse, parseISO } from "date-fns";
export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const orders = await getAllBakerOrders(uid);
    var sevenDaysOut = new Date();
    var today = new Date();
    sevenDaysOut.setDate(sevenDaysOut.getDate() + 7);
    orders.orderList.forEach((order) => {
      if (
        parseISO(order.pickupDate) < sevenDaysOut &&
        today < parseISO(order.pickupDate)
      ) {
        console.log(order.name);
      }
    });
    // console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
};
