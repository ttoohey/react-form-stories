import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ErrorBox from "../components/ErrorBox";

const query = gql`
  query {
    allUsers {
      id
      name
      email
    }
  }
`;

export default function ListTodos({ onClickItem }) {
  const { data, loading, error } = useQuery(query);
  const [id, setId] = React.useState(null);
  if (loading) {
    return null;
  }
  if (error) {
    return <ErrorBox>{error}</ErrorBox>;
  }
  if (!data.allUsers.length) {
    return <div>No users</div>;
  }
  return (
    <table border={1}>
      <caption>Users</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data.allUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={event => onClickItem(event, user)}>edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
