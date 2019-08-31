import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

export default function withApolloProvider (uri = "https://swapi.graph.cool/") {
  const client = new ApolloClient({
    link: createHttpLink({ uri }),
    cache: new InMemoryCache()
  });
  return storyFn => {
    return <ApolloProvider client={client}>{storyFn()}</ApolloProvider>;
  };
}
