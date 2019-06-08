import React from "react";
import gql from "graphql-tag";
import { Form } from "@ttoohey/react-form";
import TextField from "../components/TextField";

const initialData = {
  title: ""
};

const query = gql`
  query($id: ID!) {
    todo(id: $id) {
      id
      title
    }
  }
`;

const createMutation = gql`
  mutation($title: String) {
    createTodo(title: $title) {
      todo {
        id
        title
      }
    }
  }
`;

const updateMutation = gql`
  mutation($id: ID!, $title: String) {
    updateTodo(id: $id, title: $title) {
      todo {
        id
        title
      }
    }
  }
`;

function handleSuccess(event, result, { setFormData }) {
  setFormData(initialData)
  return result
}

export default function EditTodo({ id, onSubmit = () => null }) {
  const mutation = id ? updateMutation : createMutation;
  const mutationVariables = id
    ? ({ title }) => ({ id, title })
    : ({ title }) => ({ title });
  return (
    <Form
      data={initialData}
      query={id ? query : null}
      queryVariables={id ? { id } : null}
      mutation={mutation}
      mutationVariables={mutationVariables}
      onSubmit={onSubmit}
      onSubmitSuccess={handleSuccess}
    >
      <TextField name="title" placeholder="what needs to be done?" />
    </Form>
  );
}
