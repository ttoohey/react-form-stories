import React from "react";
import { Form } from "@ttoohey/react-form";
import gql from "graphql-tag";
import TextField from "../components/TextField";
import ErrorBox from "../components/ErrorBox";

const query = gql`
  query($id: ID!) {
    node(id: $id) {
      id
      ... on Person {
        name
        birthYear
        invalidAttribute
      }
    }
  }
`;

export default function MyForm({ id, onSubmit }) {
  return (
    <Form
      query={query}
      queryVariables={{ id }}
      onSubmit={onSubmit}
      renderError={({ queryError }) => <ErrorBox>{queryError}</ErrorBox>}
    >
      <div>
        <TextField name="name" label="The name of this person." />
        <TextField name="birthYear" label="The birth year of the person" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
