"use client";

import React, { ReactNode } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export const ApolloContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const client = new ApolloClient({
    uri: "https://api-v2-amoy.lens.dev",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
