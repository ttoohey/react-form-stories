import React from "react";
import MyFormProvider from "./MyFormProvider";
import ListUser from "./ListUser";
import EditUserForm from "./EditUserForm";

export default function App() {
  const [id, setId] = React.useState(null);

  return (
    <MyFormProvider>
      <ListUser onClickItem={(event, { id }) => setId(id)} />
      {id && (
        <>
          <hr />
          <EditUserForm id={id} onSubmit={() => setId(null)} />
        </>
      )}
    </MyFormProvider>
  );
}
