import { Flex } from "@chakra-ui/react";
import LoginForm from "@/components/LoginForm";
import LoginFormYup from "@/components/LoginFormYup";
import LoginFormZod from "@/components/LoginFormZod";

export default function Home() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <LoginForm boxShadow="xl" m={3} />
      <LoginFormYup boxShadow="xl" m={3} />
      <LoginFormZod boxShadow="xl" m={3} />
    </Flex>
  );
}
