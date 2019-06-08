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
      }
    }
  }
`;

const mutations = {
  submit: gql`
    mutation($id: ID!, $birthYear: String, $name: String) {
      updatePerson(id: $id, birthYear: $birthYear, name: $name) {
        id
        name
        birthYear
      }
    }
  `,
  delete: gql`
    mutation($id: ID!) {
      deletePerson(id: $id) {
        id
      }
    }
  `
};

function any(o) {
  return Object.values(o).reduce((c, v) => c || v, null);
}

export default function MyForm({ id, onSubmit, onDelete }) {
  return (
    <Form
      query={query}
      queryVariables={{ id }}
      mutations={mutations}
      mutationsVariables={{
        submit: data => ({ id, ...data }),
        delete: () => ({ id })
      }}
      onSubmit={onSubmit}
      onDelete={onDelete}
    >
      {({ actions, mutationErrors }) => (
        <>
          <div>
            <TextField name="name" label="The name of this person." />
            <TextField name="birthYear" label="The birth year of the person" />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button onClick={actions.delete}>Delete</button>
          </div>
          {any(mutationErrors) && <ErrorBox>{any(mutationErrors)}</ErrorBox>}
        </>
      )}
    </Form>
  );
}
