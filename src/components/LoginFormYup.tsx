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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Inputs = {
  emailAddress: string;
  password: string;
};

const schema = yup.object().shape({
  emailAddress: yup
    .string()
    .label("メールアドレス")
    .required(({ label }) => `${label}は入力必須だよ`)
    .min(8, ({ min }) => `${min}文字以上入力してね`)
    .email("フォーマットが正しくないよ"),
  password: yup
    .string()
    .label("パスワード")
    .required(({ label }) => `${label}は入力必須だよ`)
    .min(8, ({ min }) => `${min}文字以上入力してね`),
});

export default function LiginFormYup({ ...delegated }: FlexProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <Flex direction="column" p={12} rounded={6} {...delegated}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading mb={6}>Log in (yup)</Heading>
        <FormControl isRequired isInvalid={!!errors.emailAddress} mb={3}>
          <FormLabel>Email address</FormLabel>
          <Input variant="filled" type="email" {...register("emailAddress")} />
          <FormErrorMessage>{errors.emailAddress?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.password} mb={6}>
          <FormLabel>Password</FormLabel>
          <Input variant="filled" type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" type="submit" disabled={!isValid}>
          Log in
        </Button>
      </form>
    </Flex>
  );
}
