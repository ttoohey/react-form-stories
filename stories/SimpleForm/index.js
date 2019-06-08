import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ContextForm from "./ContextForm";
import ContextFormReadme from "./ContextForm.md";
import RenderPropsForm from "./RenderPropsForm";
import RenderPropsFormReadme from "./RenderPropsForm.md";
import ValidateForm from "./ValidateForm";
import ValidateFormReadme from "./ValidateForm.md";

storiesOf("Simple forms", module)
  .add(
    "Using render props",
    () => <RenderPropsForm onSubmit={action("submit")} />,
    {
      info: {
        text: RenderPropsFormReadme,
        propTablesExclude: [RenderPropsForm],
        inline: true
      }
    }
  )
  .add(
    "Using form context",
    () => <ContextForm onSubmit={action("submit")} />,
    {
      info: {
        text: ContextFormReadme,
        propTablesExclude: [ContextForm],
        inline: true
      }
    }
  )
  .add("Validation", () => <ValidateForm onSubmit={action("submit")} />, {
    info: {
      text: ValidateFormReadme,
      propTablesExclude: [ValidateForm],
      inline: true
    }
  });
