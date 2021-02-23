import {
  Box,
  Text,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
  Image,
  Grid,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import { PhoneIcon, ChatIcon, EmailIcon } from "@chakra-ui/icons";
import { parseISO, format } from "date-fns";
import React, { useState, useRef } from "react";
import { updateOrder } from "@/lib/db";

export default function OrderReviewTemplate({ order }) {
  const toast = useToast();

  const [pickupDate, setPickupDate] = useState(
    order.pickupDate
      ? new Date(order.pickupDate)
      : new Date("2020-05-21T04:21:41.687Z")
  );
  const [cost, setCost] = useState(order.cost || 0);
  const [status, setStatus] = useState(order.status);

  function onUpdate(e) {
    e.preventDefault();
    const orderInfoUpdate = {
      pickupDate: pickupDate.toISOString(),
      cost: parseFloat(cost),
      status,
    };
    toast({
      position: "top",
      title: "Updated",
      description: "The order has been updated.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    updateOrder(order.id, orderInfoUpdate);
  }

  return (
    <>
      <Box background="white" p={4} mb={4} borderRadius="20px" maxW="650px">
        <Text fontSize="sm" color="blue.400">
          Customer Info
        </Text>
        <Text fontSize="xl">{order.name}</Text>
        <Text fontSize="xl">
          <PhoneIcon w={4} h={4} mr={1} /> {order.phoneNumber}
        </Text>
        <Text fontSize="xl">
          <EmailIcon w={4} h={4} mr={2} />
          {order.email}
        </Text>
        <Text fontSize="xl">
          <ChatIcon w={4} h={4} mr={2} />
          {order.contactMethod}
        </Text>
      </Box>
      <Box background="white" p={4} mb={4} borderRadius="20px" maxW="650px">
        <Text fontSize="sm" color="blue.400">
          Order Info
        </Text>
        <Flex>
          <Text fontSize="xl" color="gray.500" mr={2}>
            Event Date:
          </Text>
          <Text fontSize="xl">{format(parseISO(order.eventDate), "PPP")}</Text>
        </Flex>

        <Flex>
          <Text fontSize="xl" color="gray.500" mr={2}>
            Theme:
          </Text>
          <Text fontSize="xl">{order.theme}</Text>
        </Flex>
        <Flex>
          <Text fontSize="xl" color="gray.500" mr={2}>
            Quantity:
          </Text>
          <Text fontSize="xl">{order.quantity}</Text>
        </Flex>
        <Flex mb={4} alignItems="baseline">
          <Text fontSize="xl" color="gray.500" mr={2}>
            Notes:
          </Text>
          <Text fontSize="lg">{order.notes}</Text>
        </Flex>
        <Flex alignItems="center" mb={2}>
          <Text fontSize="xl" color="gray.500" mr={2}>
            Cost:
          </Text>

          <NumberInput
            precision={2}
            width={36}
            value={cost}
            min={0}
            onChange={(e) => {
              setCost(e);
            }}
          >
            <NumberInputField />
          </NumberInput>
        </Flex>
        <Flex alignItems="center" mb={2}>
          <Text fontSize="xl" color="gray.500" mr={2}>
            Pick Up Date:
          </Text>
          <DatePicker
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            timeFormat="hh:mm aa"
            dateFormat="MMMM d, yyyy hh:mm aa"
          />
        </Flex>
        <Flex alignItems="center" mb={2}>
          <Text fontSize="xl" color="gray.500" mr={2}>
            Status:
          </Text>
          <Select
            width={36}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
          </Select>
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)">
          {order.images
            ? order.images.map((picture) => (
                <Box
                  key={picture}
                  background="gray.300"
                  padding={1}
                  mr={2}
                  mb={2}
                  borderRadius="4px"
                >
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={picture}
                    alt="Segun Adebayo"
                  />
                </Box>
              ))
            : null}
        </Grid>
      </Box>
      <Button w={32} colorScheme="green" onClick={onUpdate}>
        Update
      </Button>
    </>
  );
}
