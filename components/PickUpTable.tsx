// type PickUpProps = {
import React, { FunctionComponent, useState, useEffect } from "react";
import NextLink from "next/link";
import { format, parseISO, isSameDay } from "date-fns";
import { Order } from "@/utils/interfaces";
import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

type TableProps = {
  orders: Array<Order>;
  startDate: Date;
};
export const PickUpTable: FunctionComponent<TableProps> = ({
  orders,
  startDate,
  ...rest
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
  useEffect(() => {
    console.log(calender);
  }, [calender]);

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

  const testFunction = (pickupDay: Date) => {
    let tempArray = [];
    // console.log("--------------", calenderOrders);
    for (let i = 0; i < calenderOrders.length; i++) {
      if (isSameDay(parseISO(calenderOrders[i].pickupDate), pickupDay)) {
        tempArray.push(calenderOrders[i]);
      }
    }

    return tempArray;
  };
  return (
    <Table {...rest} background="white" borderRadius="20px" variant="unstyled">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Pick Up Time</Th>
          <Th>Payment</Th>
          <Th>{""}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {calender
          ? calender.map((day) => {
              const info = testFunction(day);
              console.log("INFO", info);
              return (
                <>
                  <Tr
                    borderBottom="1px teal solid"
                    _last={{ borderBottom: "none" }}
                  >
                    <Td fontWeight="bold" color="teal" _last={{}}>
                      {format(day, "do EEEE")}
                    </Td>
                  </Tr>
                  {info.map((info) => (
                    <Tr>
                      <Td>{info.name || " "}</Td>
                      <Td> {format(parseISO(info.pickupDate), "h:mm aa")}</Td>
                      <Td>Cash</Td>
                      <Td>
                        <NextLink
                          href="/r/[orderId]"
                          as={`/r/${info.id}`}
                          passHref
                        >
                          <Link color="blue.500" fontWeight="medium">
                            View
                          </Link>
                        </NextLink>
                      </Td>
                    </Tr>
                  ))}
                </>
              );
            })
          : "Loading"}
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

// {
//   calender ? (
//     calender.map((day) => (
//       <>
//         <Tr>
//           <Td fontWeight="bold" color="teal" borderBottom="1px teal solid">
//             {format(day, "EEEE do")}
//           </Td>
//         </Tr>
//         {pickupsForDate(day).map((pickup) => {
//           return (
//             <Tr>
//               <Td>{pickup.name}</Td>
//             </Tr>
//           );
//         })}
//       </>
//     ))
//   ) : (
//     <Tr>
//       <Td>Loading</Td>
//     </Tr>
//   );
// }
