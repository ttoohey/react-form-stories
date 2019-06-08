import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Form } from "@ttoohey/react-form";
import TextField from "./TextField";
import Readme from "./TextField.md";

storiesOf("Demo components", module).add(
  "TextField",
  () => (
    <Form data={{ field1: "" }} onSubmit={action("submit")}>
      <TextField name="field1" />
      <button type="submit">Submit</button>
    </Form>
  ),
  {
    info: {
      text: Readme,
      header: true,
      propTablesExclude: [Form, TextField]
    }
  }
);
