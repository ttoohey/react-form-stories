import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import QueryForm from "./QueryForm";
import QueryFormReadme from "./QueryForm.md";
import MutationForm from "./MutationForm";
import MutationFormReadme from "./MutationForm.md";
import LoadingForm from "./LoadingForm";
import LoadingFormReadme from "./LoadingForm.md";
import QueryErrorForm from "./QueryErrorForm";
import QueryErrorFormReadme from "./QueryErrorForm.md";
import MutationProgressForm from "./MutationProgressForm";
import MutationProgressFormReadme from "./MutationProgressForm.md";
import MutationErrorForm from "./MutationErrorForm";
import MutationErrorFormReadme from "./MutationErrorForm.md";
import MutationErrorForm2 from "./MutationErrorForm2";
import MutationErrorFormReadme2 from "./MutationErrorForm2.md";

storiesOf("GraphQL forms", module)
  .add(
    "Using a query to pre-load data",
    () => (
      <QueryForm id="cj0nv9p8yewci0130wjy4o5fa" onSubmit={action("submit")} />
    ),
    {
      info: {
        text: QueryFormReadme,
        propTablesExclude: [QueryForm],
        inline: true
      }
    }
  )
  .add(
    "Render loading",
    () => (
      <LoadingForm
        id="cj0nv9p8yewci0130wjy4o5fa"
        onSubmit={action("submit")}
        onDelete={action("delete")}
      />
    ),
    {
      info: {
        text: LoadingFormReadme,
        propTablesExclude: [LoadingForm],
        inline: true
      }
    }
  )
  .add(
    "Render error",
    () => (
      <QueryErrorForm
        id="invalid"
        onSubmit={action("submit")}
        onDelete={action("delete")}
      />
    ),
    {
      info: {
        text: QueryErrorFormReadme,
        propTablesExclude: [QueryErrorForm],
        inline: true
      }
    }
  )
  .add(
    "Using mutations",
    () => (
      <MutationForm
        id="cj0nv9p8yewci0130wjy4o5fa"
        onSubmit={action("submit")}
        onDelete={action("delete")}
      />
    ),
    {
      info: {
        text: MutationFormReadme,
        propTablesExclude: [MutationForm],
        inline: true
      }
    }
  )
  .add(
    "Showing mutation progress",
    () => (
      <MutationProgressForm
        id="cj0nv9p8yewci0130wjy4o5fa"
        onSubmit={action("submit")}
        onDelete={action("delete")}
      />
    ),
    {
      info: {
        text: MutationProgressFormReadme,
        propTablesExclude: [MutationProgressForm],
        inline: true
      }
    }
  )
  .add(
    "Handling mutation errors with an event handler",
    () => (
      <MutationErrorForm
        id="cj0nv9p8yewci0130wjy4o5fa"
        onSubmit={action("submit")}
        onDelete={action("delete")}
      />
    ),
    {
      info: {
        text: MutationErrorFormReadme,
        propTablesExclude: [MutationErrorForm],
        inline: true
      }
    }
  )
  .add(
    "Handling mutation errors using render props",
    () => (
      <MutationErrorForm2
        id="cj0nv9p8yewci0130wjy4o5fa"
        onSubmit={action("submit")}
        onDelete={action("delete")}
      />
    ),
    {
      info: {
        text: MutationErrorFormReadme2,
        propTablesExclude: [MutationErrorForm2],
        inline: true
      }
    }
  );
