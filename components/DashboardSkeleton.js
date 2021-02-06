import React from "react";
import { useAuth } from "@/lib/auth";
import { Flex, Text, Box } from "@chakra-ui/react";
import {
  CopyIcon,
  StarIcon,
  Search2Icon,
  SettingsIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import NavLink from "./NavLink";
import NavSignOut from "./NavSignOut";

export default function DashboardSkeleton({ children }) {
  const { user } = useAuth();
  return (
    <Box backgroundColor="blackAlpha.100" p={10} pl={5}>
      <Flex //Side bar
        flexDirection="column"
        backgroundColor="teal.500"
        borderRadius="20px"
        maxWidth={48}
        justifyContent="center"
        p={2}
        height="60vh"
        pos="fixed"
      >
        <NavLink pageRoute="dashboard">
          <StarIcon mr={2} />
          <Text fontWeight="bold" fontSize="lg">
            Home
          </Text>
        </NavLink>
        <NavLink pageRoute="orderform">
          <CopyIcon mr={2} />
          <Text fontSize="lg">Order Form</Text>
        </NavLink>
        <NavLink pageRoute="search">
          <Search2Icon mr={2} />
          <Text fontSize="lg">Search</Text>
        </NavLink>
        <NavLink pageRoute="settings">
          <SettingsIcon mr={2} />
          <Text fontSize="lg">Settings</Text>
        </NavLink>
        {user ? (
          <NavSignOut />
        ) : (
          <NavLink pageRoute="signin">
            <TriangleUpIcon mr={2} />
            <Text fontSize="lg">Sign In</Text>
          </NavLink>
        )}
      </Flex>
      {/* 
        Might have to change this to have a maxWidth Variable later */}
      <Flex ml={48} flexDirection="column">
        {children}
      </Flex>
    </Box>
  );
}
