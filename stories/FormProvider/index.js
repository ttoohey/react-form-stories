import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import App from "./App";
import AppReadme from "./App.md";

storiesOf("Form provider", module).add(
  "Transform by GraphQL Types",
  () => (
    <App
      id="cj0nxmy3fga5s01148gf8iy3c"
      onSubmit={action("submit")}
      onDelete={action("delete")}
    />
  ),
  {
    info: {
      text: AppReadme,
      propTablesExclude: [App],
      inline: true
    }
  }
);
