import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import App from "./App";
import Readme from "./ApolloCache.md";

storiesOf("Form provider", module).add("Updating Apollo cache", () => <App />, {
  info: {
    text: Readme,
    propTablesExclude: [App],
    inline: true
  }
});
