import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { createUser } from "../../services/userDataSource";
import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

interface SignUpFormProps {}

interface SignUpFormValueProps {
  username: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // @ts-expect-error
  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "username is required";
    } else if (value.length < 5) {
      error = "at least 5 characters bro";
    }
    return error;
  };

  //const handleSubmit =

  return (
    <Box p={4} w={["90%", "90%", "60%", "30%"]} mx="auto" mt={8}>
      <Heading size="lg" color="primary.500">
        Hello, create an user
      </Heading>

      <Heading color="muted.400" size="xs" mt={4} mb={8}>
        Just username, for stake of simplicity
      </Heading>

      <Formik
        initialValues={{ username: "" }}
        onSubmit={(values, actions) => {
          createUser(values.username)
            .then((res) => {
              if (res.status !== 201) {
                setErrorMessage("cant create user");
                actions.setSubmitting(false);
              } else {
                const data = res.data;

                console.log(data.id);
                console.log(data.username);
                actions.setSubmitting(false);

                localStorage.setItem("lavaUserId", JSON.stringify(data));
                setUser(data);

                router.push("/products");
              }
            })
            .catch((error) => {
              setErrorMessage(error.message);
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => (
          <Form>
            <Field name="username" validate={validateUsername}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  mt={4}
                  isInvalid={form.errors.username ? true : false}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} id="username" type="text" />
                  <FormHelperText>
                    Just type in any 5 character, then will create an user, and
                    return a userId
                  </FormHelperText>

                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              colorScheme="teal"
              mt={4}
              isLoading={props.isSubmitting}
              type="submit"
            >
              Create User
            </Button>
          </Form>
        )}
      </Formik>

      {errorMessage && <Text>{errorMessage}</Text>}
    </Box>
  );
};

export default SignUpForm;
