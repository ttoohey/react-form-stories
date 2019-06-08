## Handling server-side validation errors

There are various techniques that servers may use to indicate a validation error has
occurred. This example focuses on a strategy that is compatible with
[validator-creator](https://github.com/ttoohey/validator-creator) and follows
conventions described in Apollo Docs
([Error Handling](https://www.apollographql.com/docs/apollo-server/features/errors/)).

Consider a server that implements a mutation resolver that throws a validation
error

```js
// resolvers.js
import { UserInputError } from "apollo-server";
import * as User from "../models/User";

export const resolvers = {
  Mutation: {
    updateUser(root, { id, name, email }) {
      if (User.search({ email }).filter(user => user.id !== id).length > 0) {
        throw new UserInputError("Validation error", {
          validator: [{ prop: "email", type: "unique" }]
        });
      }
      return User.update(id, { name, email });
    }
  }
};
```

The network response will contain a list of `errors` objects with the
structure as follows:

```js
{
  "errors": [
    {
      "message": "Validator error",
      "path": "updateUser",
      "extensions": {
        "code": "BAD_USER_INPUT",
        "exception": {
          "validator": [
            {
              "prop": "email",
              "type": "unique"
            }
          ]
        }
      }
    }
  ]
}
```

The `createValidatorErrorHandler` function is used to interpret this structure
and process the error event. It will _consume_ "BAD_USER_INPUT" errors, augment
the validator results with payload data, and pass the results to the `validate`
function.

```jsx
// EditUserForm.js
import React from "react";
import { Form, createValidatorErrorHandler } from "@ttoohey/react-form";
import gql from "graphql-tag";
import { createAsyncRule } from "react-use-validator";
import { isEmpty, isEmail } from "validator";
import TextField from "../components/TextField";

const initialData = {
  name: "",
  email: ""
};

const query = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const mutation = gql`
  mutation($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const server = createAsyncRule(() => []);
const serverMessage = { unique: "Already in use" };
const handleServerError = createValidatorErrorHandler(server, serverMessage);

const rules = {
  name: [server],
  email: [server]
};

export default function EditUserForm({ id, onSubmit = () => null }) {
  return (
    <Form
      data={initialData}
      rules={rules}
      query={query}
      queryVariables={{ id }}
      mutation={mutation}
      mutationVariables={({ name, email }) => ({ id, name, email })}
      onSubmit={onSubmit}
      onSubmitError={handleServerError}
    >
      <div>ID: {id}</div>
      <div>
        <TextField name="name" label="Name" />
        <TextField name="email" label="Email" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
```
