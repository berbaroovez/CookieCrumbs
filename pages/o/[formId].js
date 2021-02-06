import { useRouter } from "next/router";

import DatePicker from "react-datepicker";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Box,
  Select,
  Textarea,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { submitOrder } from "@/lib/db";
import { getAllBakers, getUserInfo } from "@/lib/db-admin";

export async function getStaticProps(context) {
  const formId = context.params.formId;

  const bakerInfo = await getUserInfo(formId);

  return {
    props: {
      bakeryInfo: bakerInfo,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllBakers();
  const paths = sites.map((site) => ({
    params: {
      formId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function OrderFormPage({ bakeryInfo }) {
  const router = useRouter();

  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPhoneNumber = useRef(null);
  const inputContact = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const inputTheme = useRef(null);
  const inputQuantity = useRef(null);
  const inputNotes = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      bakerId: router.query.formId,
      name: inputName.current.value,
      email: inputEmail.current.value,
      phoneNumber: inputPhoneNumber.current.value,
      contactMethod: inputContact.current.value,
      eventDate: startDate.toISOString(),
      theme: inputTheme.current.value,
      quantity: inputQuantity.current.value,
      notes: inputNotes.current.value,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    submitOrder(newOrder);
  };

  return (
    <Box as="form" onSubmit={onSubmit} margin={8}>
      <Text fontSize="2xl" casing="uppercase">
        {bakeryInfo.companyName || "Order Form"}
      </Text>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input mb={4} type="text" ref={inputName} placeholder="Nate Stanz" />

        <FormLabel>Email address</FormLabel>
        <Input type="email" ref={inputEmail} />
        <FormHelperText mb={4}>We'll never share your email.</FormHelperText>

        <FormLabel>Phone Number</FormLabel>
        <Input type="tel" ref={inputPhoneNumber} />
        <FormHelperText mb={4}>
          We'll never share your phone number.
        </FormHelperText>

        <FormLabel>Preffered Contact</FormLabel>
        <Select placeholder="Choose Contact" ref={inputContact}>
          <option value="Phone">Phone Call</option>
          <option value="Text">Text</option>
          <option value="Email">Email</option>
        </Select>
        <FormHelperText mb={4}>Let us know how to contact you.</FormHelperText>

        <Box mb={4}>
          <FormLabel>Event Date</FormLabel>
          <DatePicker
            minDate={new Date()}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Box>

        <FormLabel>Order Theme</FormLabel>
        <Select placeholder="Choose Theme" ref={inputTheme}>
          <option value="Birthday">Phone Call</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Wedding">Wedding</option>
          <option value="Shower">Shower</option>
          <option value="Halloween">Halloween</option>
          <option value="Christmas">Christmas</option>
          <option value="Graduation">Graduation</option>
          <option value="Communion">Communion</option>
          <option value="Other">Other</option>
        </Select>
        <FormHelperText mb={4}>
          Let us know the theme of the event.
        </FormHelperText>

        <FormLabel>How many cookies do you need?</FormLabel>
        <Input type="number" ref={inputQuantity} />
        <FormHelperText mb={4}>
          Please enter whole numbers. A dozen = 12
        </FormHelperText>

        <FormLabel>Notes</FormLabel>
        <Textarea
          placeholder="Ex: The birthday will be Fortnite themed"
          size="sm"
          ref={inputNotes}
        />
        <FormHelperText mb={4}>
          Have any extra questions or details let us know!
        </FormHelperText>

        <FormLabel>Agreement</FormLabel>
        <Checkbox>
          By submitting your order you understand that your order isnt confirmed
          until we reach out to you.
        </Checkbox>

        <Button mt={16} type="submit" colorScheme="teal" fontWeight="medium">
          Order
        </Button>
      </FormControl>
    </Box>
  );
}
