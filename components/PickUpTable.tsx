// type PickUpProps = {
import React, { FunctionComponent, useState, useEffect } from "react";

import { format } from "date-fns";
import { Order } from "@/utils/interfaces";
import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

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

  useEffect(() => {
    let tempCalender: Array<Date> = [];

    for (let i = 0; i <= 5; i++) {
      let currentDate: Date = new Date();
      currentDate.setDate(startDate.getDate() + i);
      tempCalender.push(currentDate);
    }
    setCalender(tempCalender);
  }, []);

  // for (let i = 0; i <= 5; i++) {
  //   let currentDate: Date = new Date();
  //   currentDate.setDate(startDate.getDate() + i);
  //   calender.push(format(currentDate, "EEEE do"));
  // }
  // <Td>{format(parseISO(order.eventDate), "P")}</Td>;

  return (
    <Table background="white" borderRadius="20px" height={16}>
      <Thead>
        <Th>Name</Th>
        <Th>Pick Up Time</Th>
        <Th>Payment</Th>
        <Th>{""}</Th>
      </Thead>
      <Tbody>
        {calender ? (
          calender.map((day) => (
            <Tr>
              <Td>{format(day, "EEEE do")}</Td>
            </Tr>
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
