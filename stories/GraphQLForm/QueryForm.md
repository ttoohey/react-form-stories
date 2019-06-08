## Using GraphQL queries

When the `query` prop is passed a GraphQL query the `Form` component will
load the form with the data returned by the query.

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

export default function MyForm({ id, onSubmit }) {
  return (
    <Form query={query} queryVariables={{ id }} onSubmit={onSubmit}>
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
