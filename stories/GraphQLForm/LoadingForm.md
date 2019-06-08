## Showing a 'loading' state

The `renderLoading` prop is used to provide a "loading" component while the
GraphQL query is loading.

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

function Loading() {
  return <div>Loading..</div>;
}

export default function MyForm({ id, onSubmit }) {
  return (
    <Form
      query={query}
      queryVariables={{ id }}
      onSubmit={onSubmit}
      renderLoading={Loading}
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
