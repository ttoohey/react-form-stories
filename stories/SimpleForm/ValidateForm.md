## Validation

The `Form` component accepts a `rules` prop that contains a _rule collection_.
How to define rules can be seen at [validator-creator](https://github.com/ttoohey/validator-creator)

The form's context will then contain a `messages` object that is populated with
the results of the validator. The `useFormValidation` hook may be used to acccess
the `messages` object. The `TextField` component (see "Demo components") uses
`useFormValidation` to access the `messages` object and will display the field's
corresponding message (if there is one).

The "render props" method is being used to access the validator `messages` object
to allow us to disable the submit button when there is a validation message.

```jsx
// MyForm.js
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
```
