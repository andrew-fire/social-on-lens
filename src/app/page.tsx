"use client";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useAccount } from "wagmi";
import { useSession } from "@lens-protocol/react-web";
import { LoginForm } from "@/components";
import { Header } from "@/components/Header";

const client = new ApolloClient({
  uri: "https://api-v2-amoy.lens.dev/graphql",
  cache: new InMemoryCache(),
});

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: session } = useSession();

  return (
    <ApolloProvider client={client}>
      <main className="w-full flex min-h-screen flex-col gap-5 p-8">
        <Header isConnected={isConnected} address={address} session={session} />

        {address && !session?.authenticated && <LoginForm owner={address} />}
      </main>
    </ApolloProvider>
  );
}
