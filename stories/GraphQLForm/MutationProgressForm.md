## Showing mutation progress

The Form component's context includes a `progress` property that contains a
boolean value for each action (the Form has an action for each mutation).

This example uses the `progress` states to display alternate text on the
relevant button label.

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
```

An app could provide a _form context aware_ `Button` component that handles the
`progress` state in other ways. For example, show a spinner:

```jsx
// Button.js
import React from "react";
import Spinner from "react-spinner";
import { useFormContext } from "@ttoohey/react-form";

export default function Button({ name, ...props }) {
  const { progress } = useFormContext();
  if (progress[name]) {
    return <Spinner />;
  } else {
    return <button {...props} />;
  }
}
```
