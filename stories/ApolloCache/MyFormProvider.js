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
