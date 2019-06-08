## Render props form

The `Form` component accepts a child using _render props_ syntax. The passed function
receives the Form's context allowing access to the `formData` and `updateFormData`
properties.

The `formData` and `updateFormData` are sufficent to display the form and respond
to user interactions.

A single button of type `submit` will trigger the Form's submit action (which, by
default, is `onSubmit`).

```jsx
import React from "react";
import { Form } from "@ttoohey/react-form";

export default function MyForm({ onSubmit }) {
  return (
    <Form data={{ field1: "one", field2: "two" }} onSubmit={onSubmit}>
      {({ formData, updateFormData }) => {
        function onChange(event) {
          const { name, value } = event.target;
          updateFormData({ [name]: value });
        }
        return (
          <>
            <div>
              <div>
                <label>Field 1</label>
                <input
                  name="field1"
                  value={formData.field1}
                  onChange={onChange}
                />
              </div>
              <div>
                <label>Field 2</label>
                <input
                  name="field2"
                  value={formData.field2}
                  onChange={onChange}
                />
              </div>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </>
        );
      }}
    </Form>
  );
}

```
