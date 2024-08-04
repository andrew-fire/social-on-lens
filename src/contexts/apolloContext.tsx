"use client";

import React, { ReactNode } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

export const ApolloContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const link = createHttpLink({
    uri: "https://api-v2-amoy.lens.dev",
    credentials: "same-origin",
  });

  const client = new ApolloClient({
    uri: "https://api-v2-amoy.lens.dev",
    cache: new InMemoryCache(),
    link,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
