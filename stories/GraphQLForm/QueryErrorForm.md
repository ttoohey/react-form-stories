## Showing an 'error' state

The `renderError` prop is used to provide an "error" component if the
GraphQL query failed.

```jsx
// MyForm.js
import React from "react";
import gql from "graphql-tag";
import { Form } from "@ttoohey/react-form";
import TextField from "./TextField";
import ErrorBox from './ErrorBox'

const query = gql`
  query($id: ID!) {
    node(id: $id) {
      id
      ... on Person {
        name
        birthYear
        invalidAttribute /* this triggers an error on the server */
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
```
