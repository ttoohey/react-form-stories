import graphqlDataTransform from "graphql-data-transform";
import schema from "./schema.graphql";

const transforms = {
  DateTime: {
    fromQuery: value => new Date(value),
    toMutation: value => value.toISOString()
  },
  Int: {
    toFormData: value => String(value),
    fromFormData: value => parseInt(value, 10)
  }
};
const setMethods = ["fromQuery", "fromFormData"];
const getMethods = ["toFormData", "toMutation"];
export default graphqlDataTransform(schema, transforms, setMethods, getMethods);
