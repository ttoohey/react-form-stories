## Defining defaults for Form props

Some props of the `Form` component are usually able to be re-used across
different forms within a single app. This example sets up data transformations
using the `toFormData` and `toMutationVariable` props.

To start with, data transformations are setup using types from the GraphQL schema
using the [graphql-data-transform](https://github.com/ttoohey/graphql-data-transform)
library.

The schema in this example comes from https://swapi.graph.cool/. It defines a
custom *scalar* type, `DateTime`, which is formatted as an ISO date string in
GraphQL requests and responses. For our app, values of the `DateTime` type will
be converted to `Date` objects.

Values of type "Int" are handled as strings by forms in our app. The application is
expected to provide suitable validation to ensure only valid strings are submitted.

```jsx
// dataTransform.js
import graphqlDataTransform from "graphql-data-transform";
import schema from "./schema.graphql";

const transforms = {
  DateTime: {
    fromQuery: value => new Date(value),
    toMutation: value => value.toISOString()
  },
  Int: {
    toFormData: value => String(value),
    fromFormData: value => parseInt(value, 10)
  }
};
const setMethods = ["fromQuery", "fromFormData"];
const getMethods = ["toMutation", "toFormData"];
export default graphqlDataTransform(schema, transforms, setMethods, getMethods);
```

The `FormProvider` component provides a context to `Form` components allowing
setting parameters at a more global level. In this example, type-based
transformations of GraphQL data is handled by the `toFormdata` and
`toMutationVariable` props. All forms within this context will use these
transformations by default (a form can override this by setting the corresponding
prop directly).

```jsx
// MyFormProvider.js
import React from "react";
import { FormProvider } from "@ttoohey/react-form";
import types from "./dataTransform";

function toFormData(data, query, selectionKey) {
  return types.Query.fromQuery(data).toFormData();
}

function toMutationVariable(value, inputType) {
  return types[inputType].fromFormData(value).toMutation();
}

export default function MyFormProvider({ children }) {
  return (
    <FormProvider
      toFormData={toFormData}
      toMutationVariable={toMutationVariable}
    >
      {children}
    </FormProvider>
  );
}
```

This example form demonstrates a DateTime field and an Int field. Note that the
developer does not need to be concerned about these type conversions - the
developer can focus on building the form.

```jsx
// MyForm.js
import React from "react";
import gql from "graphql-tag";
import { createRule } from "react-use-validator";
import { isEmpty, isInt } from "validator";
import { Form } from "@ttoohey/react-form";
import TextField from "./TextField";
import DateField from "./DateField";

const query = gql`
  query($id: ID!) {
    node(id: $id) {
      id
      ... on Film {
        title
        releaseDate
        episodeId
      }
    }
  }
`;

const mutation = gql`
  mutation($id: ID!, $title: String, $releaseDate: DateTime, $episodeId: Int) {
    updateFilm(
      id: $id
      title: $title
      releaseDate: $releaseDate
      episodeId: $episodeId
    ) {
      id
      title
      releaseDate
      episodeId
    }
  }
`;
const required = createRule("required", value => !isEmpty(value), "Required");
const number = createRule("number", value => isInt(value), "Must be a number");

const rules = {
  title: [required],
  episodeId: [required, number]
};

export default function MyForm({ id, onSubmit }) {
  return (
    <Form
      rules={rules}
      query={query}
      queryVariables={{ id }}
      mutation={mutation}
      mutationVariables={data => ({ id, ...data })}
      onSubmit={onSubmit}
    >
      <div>
        <TextField name="title" label="The title of this film" />
        <TextField name="episodeId" label="The episode number of this film" />
        <DateField
          name="releaseDate"
          label="The date of film release at original creator country"
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
```

An app would typically define a `FormProvider` component and wrap the app's
main view with it.

```jsx
// App.js
import React from "react";
import MyFormProvider from "./MyFormProvider";
import MyForm from "./MyForm";

export default function App({ id }) {
  return (
    <MyFormProvider>
      <MyForm id={id} onSubmit={() => doSomething()} />
    </MyFormProvider>
  );
}
```
