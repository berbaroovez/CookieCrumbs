//Template page for creating the shareable order form page

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
  Heading,
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
      quantity: parseInt(inputQuantity.current.value),
      notes: inputNotes.current.value,
      createdAt: new Date().toISOString(),
      status: "Pending",
      cost: 0,
    };

    submitOrder(newOrder);

    inputName.current.value = "";
    inputEmail.current.value = "";
    inputPhoneNumber.current.value = "";
    inputContact.current.value = "";
    setStartDate(new Date());
    inputTheme.current.value = "";
    inputQuantity.current.value = "";
    inputNotes.current.value = "";
  };

  return (
    <Box as="form" onSubmit={onSubmit} padding={8}>
      <Heading as="h1" size="2xl" isTruncated mb={4}>
        {bakeryInfo && bakeryInfo.companyName}
      </Heading>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input
          mb={4}
          type="text"
          ref={inputName}
          placeholder="Nate Stanz"
          isRequired
        />

        <FormLabel>Email address</FormLabel>
        <Input type="email" ref={inputEmail} isRequired />
        <FormHelperText mb={4}>We'll never share your email.</FormHelperText>

        <FormLabel>Phone Number</FormLabel>
        <Input type="tel" ref={inputPhoneNumber} isRequired />
        <FormHelperText mb={4}>
          We'll never share your phone number.
        </FormHelperText>

        <FormLabel>Preffered Contact</FormLabel>
        <Select placeholder="Choose Contact" ref={inputContact} isRequired>
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
        <Select placeholder="Choose Theme" ref={inputTheme} isRequired>
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
        <Input type="number" ref={inputQuantity} isRequired />
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
        <Checkbox isRequired>
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
