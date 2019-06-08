import React from "react";
import { Form } from "@ttoohey/react-form";
import { createRule } from "react-use-validator";
import { isEmpty, isEmail } from "validator";
import TextField from "../components/TextField";

const required = createRule("required", value => !isEmpty(value), "Required");
const email = createRule("email", value => isEmail(value), "Invalid email");

const rules = {
  name: [required],
  email: [required, email]
};

export default function MyForm({ onSubmit }) {
  return (
    <Form data={{ name: "", email: "" }} rules={rules} onSubmit={onSubmit}>
      {({ messages }) => (
        <>
          <div>
            <TextField name="name" label="Name" />
            <TextField name="email" label="Email" />
          </div>
          <div>
            <button type="submit" disabled={Object.keys(messages).length}>
              Submit
            </button>
          </div>
        </>
      )}
    </Form>
  );
}
