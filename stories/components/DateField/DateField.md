A component to handle editing a Date object within a Form context.

```jsx
import React, { useMemo } from "react";
import { useFormData, useFormValidation } from "@ttoohey/react-form";
import format from "date-fns/format";
import parse from "date-fns/parse";

export default function DateField({ label, name, ...props }) {
  const [data, update] = useFormData();
  const [messages] = useFormValidation();

  function handleDate({ target }) {
    const { value: date } = target;
    update({ [name]: parse(`${date}T${time}`) });
  }
  function handleTime({ target }) {
    const { value: time } = target;
    update({ [name]: parse(`${date}T${time}`) });
  }
  const date = useMemo(() => format(data[name], "YYYY-MM-DD"), [data, name]);
  const time = useMemo(() => format(data[name], "HH:mm"), [data, name]);
  return (
    <div>
      <label>{label}</label>
      <input
        type="date"
        name={`${name}.date`}
        value={date}
        onChange={handleDate}
        {...props}
      />
      <input
        type="time"
        name={`${name}.time`}
        value={time}
        onChange={handleTime}
        {...props}
      />
      {messages[name] && <span style={{ color: "red" }}>{messages[name]}</span>}
    </div>
  );
}

```
