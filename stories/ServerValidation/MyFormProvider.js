import React from "react";
import gql from "graphql-tag";
import { FormProvider } from "@ttoohey/react-form";

export default function MyFormProvider({ children }) {
  return <FormProvider>{children}</FormProvider>;
}
