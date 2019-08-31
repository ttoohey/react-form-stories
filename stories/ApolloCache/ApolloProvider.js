import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

export default function({ children }) {
  const client = new ApolloClient({
    link: createHttpLink({ uri: "http://localhost:4000/" }),
    cache: new InMemoryCache()
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
