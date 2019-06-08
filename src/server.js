import { ApolloServer } from "apollo-server";
import schema from "./graphql";

const server = new ApolloServer({ schema });

const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
