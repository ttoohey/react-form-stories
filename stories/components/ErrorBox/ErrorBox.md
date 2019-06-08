Example component used in stories to display an error message.

```jsx
import React from "react";

export default function ErrorBox({ children: error, onClose }) {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        color: "red",
        border: "1px solid",
        padding: 12
      }}
      onClick={onClose}
    >
      {error.message}
    </div>
  );
}
```
