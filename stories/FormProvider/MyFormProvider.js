import React from "react";
import { FormProvider } from "@ttoohey/react-form";
import types from "./dataTransform";

function toFormData(data, query, selectionKey) {
  return types.Query.fromQuery(data).toFormData();
}

function toMutationVariable(value, inputType) {
  return types[inputType].fromFormData(value).toMutation();
}

export default function MyFormProvider({ children }) {
  return (
    <FormProvider
      toFormData={toFormData}
      toMutationVariable={toMutationVariable}
    >
      {children}
    </FormProvider>
  );
}
