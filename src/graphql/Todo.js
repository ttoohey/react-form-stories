import gql from "graphql-tag";
import * as Todo from "../models/Todo";

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String
    complete: Boolean
  }

  type TodoPayload {
    todo: Todo
  }

  extend type Query {
    allTodos: [Todo]
    todo(id: ID!): Todo
  }

  extend type Mutation {
    createTodo(title: String): TodoPayload
    updateTodo(id: ID!, title: String): TodoPayload
  }
`;

export const resolvers = {
  Query: {
    allTodos(root) {
      return Todo.all();
    },
    todo(root, { id }) {
      return Todo.find(id);
    }
  },
  Mutation: {
    createTodo(root, { title }) {
      const todo = Todo.create({ title, complete: false });
      return {
        todo
      };
    },
    updateTodo(root, { id, title }) {
      const todo = Todo.update(id, { title });
      return {
        todo
      };
    }
  }
};
