import React from "react";
import { Form } from "@ttoohey/react-form";
import gql from "graphql-tag";
import TextField from "../components/TextField";

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
      {({ actions, progress }) => (
        <>
          <div>
            <TextField name="name" label="The name of this person." />
            <TextField name="birthYear" label="The birth year of the person" />
          </div>
          <div>
            <button type="submit">
              {progress.submit ? "Submitting ..." : "Submit"}
            </button>
            <button onClick={actions.delete}>
              {progress.delete ? "Deleting ..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </Form>
  );
}
