import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
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
