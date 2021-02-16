import { parseISO, subMonths } from "date-fns";
import { Order } from "@/utils/interfaces";
interface SquareInfo {
  profit: number;
  orders: number;
  theme: string;
}
export function getSquaresInfo(orders: Array<Order>) {
  const squareInfo: SquareInfo = { profit: 0, orders: 0, theme: "None" };
  squareInfo["profit"] = getRevenue(orders);
  squareInfo["orders"] = getOrderCount(orders);
  squareInfo["theme"] = getTheme(orders);
  return squareInfo;
}

export function getRevenue(orders: Array<Order>): number {
  const todaysDate: Date = new Date();
  const monthAgoDate: Date = subMonths(new Date(), 1);
  let runningTotal: number = 0;

  orders.forEach((order) => {
    if (
      monthAgoDate < parseISO(order.eventDate) &&
      todaysDate >= parseISO(order.eventDate) &&
      order.status === "Completed"
    ) {
      runningTotal += order.cost;
    }
  });

  return runningTotal;
}

export function getOrderCount(orders: Array<Order>): number {
  const todaysDate: Date = new Date();
  const monthAgoDate: Date = subMonths(new Date(), 1);
  let runningTotal: number = 0;

  orders.forEach((order) => {
    if (
      monthAgoDate < parseISO(order.eventDate) &&
      todaysDate >= parseISO(order.eventDate) &&
      order.status === "Completed"
    ) {
      runningTotal++;
    }
  });

  return runningTotal;
}

export function getTheme(orders: Array<Order>): string {
  console.log(orders[0]);
  let themeTracker = {};
  const todaysDate: Date = new Date();
  const monthAgoDate: Date = subMonths(new Date(), 1);
  let mostOrders: string = orders[0].theme;
  orders.forEach((order) => {
    if (
      monthAgoDate < parseISO(order.eventDate) &&
      todaysDate >= parseISO(order.eventDate) &&
      order.status === "Completed"
    ) {
      if (themeTracker[order.theme]) {
        themeTracker[order.theme] += 1;
        if (themeTracker[order.theme] > themeTracker[mostOrders]) {
          mostOrders = order.theme;
        }
      } else {
        themeTracker[order.theme] = 1;
      }
    }
  });

  return mostOrders;
}

export function getPendingOrders(orders: Array<Order>): Array<Order> {
  let orderList: Array<Order> = [];
  orders.forEach((order) => {
    if (order.status === "Pending") {
      orderList.push(order);
    }
  });

  return orderList;
}
