import React from "react";
import { Form } from "@ttoohey/react-form";
import TextField from "../components/TextField";

export default function MyForm({ onSubmit }) {
  return (
    <Form data={{ field1: "one", field2: "two" }} onSubmit={onSubmit}>
      <div>
        <TextField name="field1" label="Field 1" />
        <TextField name="field2" label="Field 2" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
