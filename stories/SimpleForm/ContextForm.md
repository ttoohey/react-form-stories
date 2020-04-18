## Context form

The `Form` component is a context provider. This allows creating _context aware field components_
that can simplify writing forms. These components are wrappers around more
primitive field components that inject props from the context into the primitive.

For this demo the `TextField` component is used. This is a wrapper around the
`<input>` component that adds the `value` and `onChange` props. A similar
technique can be used to wrap components from most UI component libraries.

```jsx
// MyForm.js
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
```

Note that when compared to the "render props" and "hook" techniques, context
aware field components allow a simpler syntax due to no longer needing to
specify the `value` and `onChange` props on each field.
