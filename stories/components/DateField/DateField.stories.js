import React from "react";
import { Form } from "@ttoohey/react-form";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DateField from "./DateField";
import DateFieldReadme from "./DateField.md";

storiesOf("Demo components", module).add(
  "DateField",
  () => (
    <Form data={{ date: new Date() }} onSubmit={action("submit")}>
      <DateField name="date" />
      <button type="submit">Submit</button>
    </Form>
  ),
  {
    info: {
      text: DateFieldReadme,
      header: true,
      propTablesExclude: [Form, DateField]
    }
  }
);
