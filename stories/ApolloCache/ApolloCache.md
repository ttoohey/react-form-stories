## Updating Apollo cache after mutation

_To use this example story the example GraphQL server must be running at
http://localhost:4000/ (this can be started using `npm start`)._

A `FormProvider` is used to provide a function to update the Apollo cache
after the `createTodo` mutation.

Some background on this can be seen in the Apollo Client documentation -
[Updating after a mutation](https://www.apollographql.com/docs/react/advanced/caching/#updating-after-a-mutation)

The `cacheUpdates` object keys must match the mutation name in order to be
applied.

```jsx
// MyFormProvider.js
import React from "react";
import gql from "graphql-tag";
import { FormProvider } from "@ttoohey/react-form";

const queries = {
  allTodos: gql`
    query {
      allTodos {
        id
      }
    }
  `
};

const cacheUpdates = {
  createTodo(store, response) {
    const query = queries.allTodos;
    const data = store.readQuery({ query });
    data.allTodos.push(response.data.createTodo.todo);
    store.writeQuery({ query, data });
  }
};

export default function MyFormProvider({ children }) {
  return <FormProvider cacheUpdates={cacheUpdates}>{children}</FormProvider>;
}
```

The form component displays a single text field which is either empty to
start with (when creating a new item), or populated with the current Todo item's
title attribute (when editing an existing item). There's no submit button as
we can rely on the browser's default form submit event to trigger the submit
action and send the mutation.

The component resets the form data after a successful mutation by accessing the
form's context object in the `onSubmitSuccess` handler.

```jsx
// EditTodo.js
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
```

The list component uses the `allTodos` query to list todo items. This is the query
that is updated by the `createTodo` mutation. If there was no cache update
being performed the list wouldn't update after the mutation without a page
reload.

The EditTodo component is reused here to allow editing Todo items within
the list.

```jsx
// ListTodos.js
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ErrorBox from "../components/ErrorBox";
import EditTodo from "./EditTodo";

const query = gql`
  query {
    allTodos {
      id
      title
    }
  }
`;

export default function ListTodos() {
  const { data, loading, error } = useQuery(query);
  const [id, setId] = React.useState(null);
  if (loading) {
    return null;
  }
  if (error) {
    return <ErrorBox>{error}</ErrorBox>;
  }
  if (!data.allTodos.length) {
    return <div>No todos</div>;
  }
  return (
    <ul>
      {data.allTodos.map((todo, index) => (
        <li key={index} onClick={() => setId(todo.id)}>
          {todo.id === id ? (
            <EditTodo id={id} onSubmit={() => setId(null)} />
          ) : (
            todo.title
          )}
        </li>
      ))}
    </ul>
  );
}
```

The App brings the list and form together (at last)

```jsx
// App.js
import React from "react";
import ApolloProvider from "./ApolloProvider";
import MyFormProvider from "./MyFormProvider";
import ListTodos from "./ListTodos";
import EditTodo from "./EditTodo";

export default function App() {
  return (
    <ApolloProvider>
      <MyFormProvider>
        <h1>Todo list</h1>
        <ListTodos />
        <EditTodo />
      </MyFormProvider>
    </ApolloProvider>
  );
}
```
