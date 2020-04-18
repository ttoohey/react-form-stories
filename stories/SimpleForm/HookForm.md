## Hook form

The `useForm` hook allows access to the form's state and the `formData` and
`updateFormData` properties.

As with the _render props_ form, `formData` and `updateFormData` are sufficent
to display the form and respond to user interactions.

A single button of type `submit` will trigger the Form's submit action (which, by
default, is `onSubmit`).

```jsx
import React from "react";
import { Form, useForm } from "@ttoohey/react-form";

export default function MyForm({ onSubmit }) {
  const form = useForm({ data: { field1: "one", field2: "two" }, onSubmit });
  const { formData, updateFormData } = form;
  function onChange(event) {
    const { name, value } = event.target;
    updateFormData({ [name]: value });
  }
  return (
    <Form state={form}>
      <div>
        <div>
          <label>Field 1</label>
          <input name="field1" value={formData.field1} onChange={onChange} />
        </div>
        <div>
          <label>Field 2</label>
          <input name="field2" value={formData.field2} onChange={onChange} />
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}
```
