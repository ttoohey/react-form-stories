import React from "react";
import MyFormProvider from "./MyFormProvider";
import MyForm from "./MyForm";

export default function App(props) {
  return (
    <MyFormProvider>
      <MyForm {...props} />
    </MyFormProvider>
  );
}
