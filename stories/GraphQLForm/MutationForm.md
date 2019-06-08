## Using GraphQL mutations

This example demonstrates creating two *actions* (submit & delete) on the form
by providing mutations. The `mutations` prop maps action names to GraphQL
mutation objects. The `mutationsVariables` is used to map values from the form
into variables for each mutation.

The *render props* syntax is used to get access to the `actions` context variable.
`actions` has methods to run each action. The `Delete` button is using this to
provide it's `onClick` event handler.

The form's `onSubmit` and `onDelete` props are fired after a mutation completes
successfully.

```jsx
import React from "react";
import gql from "graphql-tag";
import { Form } from "@ttoohey/react-form";
import TextField from "./TextField";

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
