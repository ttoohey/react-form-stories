import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

export default function({ children }) {
  const client = new ApolloClient({
    link: createHttpLink({ uri: "http://localhost:4000/" }),
    cache: new InMemoryCache()
  });
  return storyFn<ApolloProvider client={client}>{children}</ApolloProvider>;
}

export const withApolloProvider = (url = "https://swapi.graph.cool/") => {
  const client = new ApolloClient({
    link: createHttpLink({ uri: "https://swapi.graph.cool/" }),
    cache: new InMemoryCache()
  });
  return storyFn => {
    return <ApolloProvider client={client}>{storyFn()}</ApolloProvider>;
  };
};
