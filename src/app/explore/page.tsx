"use client";

import { useAccount } from "wagmi";
import { Header } from "@/components/Header";
import { useLogin, useSession } from "@lens-protocol/react-web";
import { ApolloContextProvider } from "@/contexts/apolloContext";
import { Button, UsersList } from "@/components";

export default function Home() {
  const { isConnected, address: myAddress } = useAccount();
  const { data: session } = useSession();

  return (
    <ApolloContextProvider>
      <main className="w-full flex min-h-screen flex-col gap-5 p-8">
        <Header
          isConnected={isConnected}
          address={myAddress}
          session={session}
        />

        <UsersList />
      </main>
    </ApolloContextProvider>
  );
}
