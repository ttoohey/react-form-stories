## Handling mutation errors with an event handler

The `onSubmitError` and `onDeleteError` props on the `Form` component are called
if an error occurs when making the corresponding GraphQL mutation.

In this example the custom form component stores the error in a local state
variable and displays an error box if an error occurs.

```jsx
import React from "react";
import gql from "graphql-tag";
import { Form } from "@ttoohey/react-form";
import TextField from "./TextField";
import ErrorBox from "../ErrorBox/ErrorBox";

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
  const [mutationError, setMutationError] = React.useState();

  function handleMutationError(event, error) {
    setMutationError(error);
  }

  if (mutationError) {
    return (
      <ErrorBox onClose={() => setMutationError(null)}>
        {mutationError}
      </ErrorBox>
    );
  }

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
      onSubmitError={handleMutationError}
      onDeleteError={handleMutationError}
    >
      {({ actions }) => (
        <>
          <div>
            <TextField name="name" label="The name of this person." />
            <TextField name="birthYear" label="The birth year of the person" />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button onClick={actions.delete}>Delete</button>
          </div>
        </>
      )}
    </Form>
  );
}
```
