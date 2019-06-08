import { UserInputError } from "apollo-server";
import gql from "graphql-tag";
import * as User from "../models/User";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
  }

  extend type Query {
    allUsers: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(name: String, email: String): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): ID
  }
`;

export const resolvers = {
  Query: {
    allUsers(root) {
      return User.all();
    },
    user(root, { id }) {
      return User.find(id);
    }
  },
  Mutation: {
    createUser(root, { name, email }) {
      if (User.search({ email }).length > 0) {
        throw new UserInputError("Validation error", {
          validator: [{ prop: 'email', type: "unique" }]
        });
      }
      return User.create({ name, email });
    },
    updateUser(root, { id, name, email }) {
      if (User.search({ email }).filter(user => user.id !== id).length > 0) {
        throw new UserInputError("Validation error", {
          validator: [{ prop: 'email', type: "unique" }]
        });
      }
      return User.update(id, { name, email });
    },
    deleteUser(root, { id }) {
      User.remove(id);
      return id;
    }
  }
};
