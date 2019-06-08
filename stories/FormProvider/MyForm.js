import React from "react";
import { Form } from "@ttoohey/react-form";
import gql from "graphql-tag";
import { createRule } from "react-use-validator";
import { isEmpty, isInt } from "validator";
import TextField from "../components/TextField";
import DateField from "../components/DateField";

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
