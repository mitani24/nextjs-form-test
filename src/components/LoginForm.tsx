import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

type Inputs = {
  emailAddress: string;
  password: string;
};

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LiginForm({ ...delegated }: FlexProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <Flex direction="column" p={12} rounded={6} {...delegated}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading mb={6}>Log in</Heading>
        <FormControl isRequired isInvalid={!!errors.emailAddress} mb={3}>
          <FormLabel>Email address</FormLabel>
          <Input
            variant="filled"
            type="email"
            {...register("emailAddress", {
              required: "メールアドレスは入力必須だよ",
              minLength: { value: 8, message: "8文字以上入力してね" },
              pattern: {
                value: emailPattern,
                message: "フォーマットが正しくないよ",
              },
            })}
          />
          <FormErrorMessage>{errors.emailAddress?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.password} mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            variant="filled"
            type="password"
            {...register("password", {
              required: "メールアドレスは入力必須だよ",
              minLength: { value: 8, message: "8文字以上入力してね" },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" type="submit" disabled={!isValid}>
          Log in
        </Button>
      </form>
    </Flex>
  );
}
