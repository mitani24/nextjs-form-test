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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  emailAddress: z
    .string()
    .nonempty({ message: "メールアドレスは入力必須だよ" })
    .min(8, { message: "8文字以上入力してね" })
    .email({ message: "フォーマットが正しくないよ" }),
  password: z
    .string()
    .nonempty({ message: "パスワードは入力必須だよ" })
    .min(8, { message: "8文字以上入力してね" }),
});

type Inputs = z.infer<typeof schema>;

export default function LiginFormZod({ ...delegated }: FlexProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <Flex direction="column" p={12} rounded={6} {...delegated}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading mb={6}>Log in (zod)</Heading>
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
