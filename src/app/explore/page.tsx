"use client";

import { useAccount } from "wagmi";
import { Header } from "@/components/Header";
import { useLogin, useSession } from "@lens-protocol/react-web";
import { ApolloContextProvider } from "@/contexts/apolloContext";
import { Button, PublicationsList, UsersList } from "@/components";

export default function Home() {
  const { isConnected } = useAccount();
  const { data: session } = useSession();

  return (
    <ApolloContextProvider>
      <Header isConnected={isConnected} session={session} />

      <main className="w-full flex min-h-screen flex-col gap-5 p-8">
        <div className="flex justify-between">
          <PublicationsList />
          <UsersList />
        </div>
      </main>
    </ApolloContextProvider>
  );
}
