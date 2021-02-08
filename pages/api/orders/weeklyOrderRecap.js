//WIP Code for weekly recap

// import { auth } from "@/lib/firebase-admin";
// import { getAllBakerOrders } from "@/lib/db-admin";
// import { compareDesc, parse, parseISO } from "date-fns";
// export default async (req, res) => {
//   try {
//     const { uid } = await auth.verifyIdToken(req.headers.token);
//     const orders = await getAllBakerOrders(uid);

//     const weeklyList = [];
//     var sevenDaysOut = new Date();
//     var today = new Date();
//     sevenDaysOut.setDate(sevenDaysOut.getDate() + 7);
//     orders.orderList.forEach((order) => {
//       if (
//         parseISO(order.pickupDate) < sevenDaysOut &&
//         today < parseISO(order.pickupDate)
//       ) {
//         var tempDay = new Date()
//         weeklyList.push({dayName:,  ...order});
//       }
//     });

//     weeklyList.sort((a, b) =>
//       compareDesc(parseISO(a.pickupDate), parseISO(b.pickupDate))
//     );
//     res.status(200).json(weeklyList);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
