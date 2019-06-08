import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ApolloProvider } from "react-apollo-hooks";
import withApolloProvider from "../../.storybook/withApolloProvider";
import App from "./App";
import Readme from "./ServerValidation.md";

storiesOf("Validation", module)
  .addDecorator(withApolloProvider("http://localhost:4000"))
  .add("Server-side validation", () => <App />, {
    info: {
      text: Readme,
      propTablesExclude: [App, ApolloProvider],
      inline: true
    }
  });
