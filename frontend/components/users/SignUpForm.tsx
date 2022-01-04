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

interface SignUpFormProps {}

interface SignUpFormValueProps {
  username: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
  const router = useRouter();

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

  const handleSubmit = async (
    values: SignUpFormValueProps,
    { setSubmitting }: FormikHelpers<SignUpFormProps>
  ) => {
    createUser(values.username)
      .then((res) => {
        if (res.status !== 201) {
          setErrorMessage("cant create user");
          setSubmitting(false);
        } else {
          const data = res.data;

          console.log(data.id);
          console.log(data.username);
          setSubmitting(false);

          router.push("/products");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSubmitting(false);
      });
  };

  return (
    <Box p={4} w={["90%", "90%", "60%", "30%"]} mx="auto" mt={8}>
      <Heading size="lg" color="primary.500">
        Hello, create an user
      </Heading>

      <Heading color="muted.400" size="xs" mt={4}>
        Just username, for stake of simplicity
      </Heading>

      <Formik initialValues={{ username: "" }} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <Field name="username" validate={validateUsername}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                  mt={4}
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
