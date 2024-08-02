"use client";

import { useAccount } from "wagmi";
import { Profile } from "@/components";
import { Header } from "@/components/Header";
import { useParams } from "next/navigation";
import { useSession } from "@lens-protocol/react-web";
import { ApolloContextProvider } from "@/contexts/apolloContext";

export default function Home() {
  const { address } = useParams();

  const { isConnected, address: myAddress } = useAccount();
  const { data: session } = useSession();

  return (
    <ApolloContextProvider>
      <Header isConnected={isConnected} address={myAddress} session={session} />
      <main className="w-full flex min-h-screen flex-col gap-5 p-8">
        <Profile address={address} session={session} />
      </main>
    </ApolloContextProvider>
  );
}
