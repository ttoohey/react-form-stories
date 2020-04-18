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
