import React from "react";
import { Form, createValidatorErrorHandler } from "@ttoohey/react-form";
import gql from "graphql-tag";
import { createAsyncRule } from "react-use-validator";
import { isEmpty, isEmail } from "validator";
import TextField from "../components/TextField";

const initialData = {
  name: "",
  email: ""
};

const query = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const mutation = gql`
  mutation($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const server = createAsyncRule(() => []);
const serverMessage = { unique: "Already in use" };
const handleServerError = createValidatorErrorHandler(server, serverMessage);

const rules = {
  name: [server],
  email: [server]
};

export default function EditUserForm({ id, onSubmit = () => null }) {
  return (
    <Form
      data={initialData}
      rules={rules}
      query={query}
      queryVariables={{ id }}
      mutation={mutation}
      mutationVariables={({ name, email }) => ({ id, name, email })}
      onSubmit={onSubmit}
      onSubmitError={handleServerError}
    >
      <div>ID: {id}</div>
      <div>
        <TextField name="name" label="Name" />
        <TextField name="email" label="Email" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
