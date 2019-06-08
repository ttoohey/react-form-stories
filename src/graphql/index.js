import requireDirectory from "require-directory";
import { makeExecutableSchema } from "graphql-tools";
import { merge } from "lodash";

export default makeExecutableSchema(
  Object.values(requireDirectory(module)).reduce(
    (x, m) => ({
      typeDefs: m.typeDefs ? [...x.typeDefs, m.typeDefs] : x.typeDefs,
      resolvers: m.resolvers ? merge(x.resolvers, m.resolvers) : x.resolvers
    }),
    {
      typeDefs: [],
      resolvers: {}
    }
  )
);
