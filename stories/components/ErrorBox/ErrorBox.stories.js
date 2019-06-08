import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ErrorBox from "./ErrorBox";
import Readme from "./ErrorBox.md";

storiesOf("Demo components", module).add(
  "ErrorBox",
  () => (
    <ErrorBox onClose={action("close")}>
      {new Error("Demo error message")}
    </ErrorBox>
  ),
  {
    info: {
      text: Readme,
      header: true,
      propTablesExclude: [ErrorBox]
    }
  }
);
