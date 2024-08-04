"use client";

import { useAccount } from "wagmi";
import { Profile } from "@/components";
import { Header } from "@/components/Header";
import { useParams } from "next/navigation";
import {
  FollowPolicyType,
  useSession,
  useUpdateFollowPolicy,
} from "@lens-protocol/react-web";
import { ApolloContextProvider } from "@/contexts/apolloContext";
import { useEffect } from "react";

export default function Home() {
  const { id } = useParams();
  const { execute: execFollowPolicy } = useUpdateFollowPolicy();

  const { isConnected } = useAccount();
  const { data: session } = useSession();

  const setFollowPolicy = async () => {
    const res = await execFollowPolicy({
      followPolicy: {
        type: FollowPolicyType.ANYONE,
      },
    });
    console.log(res);
  };

  useEffect(() => {
    setFollowPolicy();
  }, []);

  return (
    <ApolloContextProvider>
      <Header isConnected={isConnected} session={session} />
      <main className="w-full flex min-h-screen flex-col gap-5 p-8">
        <Profile id={id} session={session} />
      </main>
    </ApolloContextProvider>
  );
}
