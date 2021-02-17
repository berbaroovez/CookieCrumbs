// type PickUpProps = {
import React, { FunctionComponent, useState, useEffect } from "react";

import { format, parseISO, isSameDay } from "date-fns";
import { Order } from "@/utils/interfaces";
import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { da } from "date-fns/locale";

// }

type TableProps = {
  orders: Array<Order>;
  startDate: Date;
};
export const PickUpTable: FunctionComponent<TableProps> = ({
  orders,
  startDate,
}) => {
  const [calender, setCalender] = useState<Array<Date>>(undefined);
  const [calenderOrders, setCalenderOrders] = useState<Array<Order>>(undefined);
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    setCalenderOrders(orders);
    let tempCalender: Array<Date> = [];

    for (let i = 0; i <= 5; i++) {
      let currentDate: Date = new Date();
      currentDate.setDate(startDate.getDate() + i);
      tempCalender.push(currentDate);
    }
    setCalender(tempCalender);
  }, []);

  const pickupsForDate = (pickupDay: Date) => {
    console.log("DATE________________________", pickupDay);
    let pickupOrderArray: Array<Order> = [];
    for (let i = counter; i < calenderOrders.length; i++) {
      console.log("Calender", calenderOrders[i].pickupDate);
      if (isSameDay(parseISO(calenderOrders[i].pickupDate), pickupDay)) {
        pickupOrderArray.push(calenderOrders[i]);
        setCounter(counter + 1);
      }
    }
    console.log(pickupOrderArray);
    return pickupOrderArray;
  };
  return (
    <Table background="white" borderRadius="20px" variant="unstyled">
      <Thead>
        <Th>Name</Th>
        <Th>Pick Up Time</Th>
        <Th>Payment</Th>
        <Th>{""}</Th>
      </Thead>
      <Tbody>
        {calender ? (
          calender.map((day) => (
            <>
              <Tr>
                <Td
                  fontWeight="bold"
                  color="teal"
                  borderBottom="1px teal solid"
                >
                  {format(day, "EEEE do")}
                </Td>
              </Tr>
              {pickupsForDate(day).map((pickup) => {
                <Tr>
                  <Td>{pickup.name}</Td>
                </Tr>;
              })}
            </>
          ))
        ) : (
          <Tr>
            <Td>Loading</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

// {calender ? (
//           <Td>{format(calender[0], "EEEE do")}</Td>
//         ) : (
//           <Td> "NAY"</Td>
//         )}

// {
//   isSameDay(parseISO(calenderOrders[2].pickupDate), day) ? "Yep" : "Nope";
// }
