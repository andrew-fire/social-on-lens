"use client";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useAccount } from "wagmi";
import { Profile } from "@/components";
import { Header } from "@/components/Header";
import { useParams } from "next/navigation";
import { useSession } from "@lens-protocol/react-web";

const client = new ApolloClient({
  uri: "https://api-v2-amoy.lens.dev/graphql",
  cache: new InMemoryCache(),
});

export default function Home() {
  const { address } = useParams();
  const { isConnected, address: myAddress } = useAccount();
  const { data: session } = useSession();

  return (
    <ApolloProvider client={client}>
      <main className="w-full flex min-h-screen flex-col gap-5 p-8">
        <Header
          isConnected={isConnected}
          address={myAddress}
          session={session}
        />

        <Profile address={address} />
      </main>
    </ApolloProvider>
  );
}
