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
