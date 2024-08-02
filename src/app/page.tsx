"use client";

import { useAccount } from "wagmi";
import { useSession } from "@lens-protocol/react-web";
import { LoginForm } from "@/components";
import { Header } from "@/components/Header";
import { ApolloContextProvider } from "@/contexts/apolloContext";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: session } = useSession();

  return (
    <ApolloContextProvider>
      <Header isConnected={isConnected} address={address} session={session} />

      <main className="w-full flex min-h-screen flex-col gap-5 p-8">
        {address && !session?.authenticated && <LoginForm owner={address} />}
      </main>
    </ApolloContextProvider>
  );
}
