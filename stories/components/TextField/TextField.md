Example component used in stories to demonstrate context aware form fields.

```jsx
// TextField.js
import React from "react";
import { useFormData, useFormValidation } from "@ttoohey/react-form";

export default function TextField({ label, name, ...props }) {
  const [data, update] = useFormData();
  const [messages] = useFormValidation();
  return (
    <div>
      <label>{label}</label>
      <input
        name={name}
        value={data[name]}
        onChange={({ target }) => update({ [name]: target.value })}
        {...props}
      />
      {messages[name] && <span style={{ color: "red" }}>{messages[name]}</span>}
    </div>
  );
}
```
