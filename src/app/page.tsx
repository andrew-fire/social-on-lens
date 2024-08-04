"use client";

import { useAccount } from "wagmi";
import {
  FollowPolicyType,
  useSession,
  useUpdateFollowPolicy,
} from "@lens-protocol/react-web";
import { ConnectWalletButton, LoginForm } from "@/components";
import { Header } from "@/components/Header";
import { ApolloContextProvider } from "@/contexts/apolloContext";
import { useEffect } from "react";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: session } = useSession();
  
  // const { execute: execFollowPolicy } = useUpdateFollowPolicy();
  // const setFollowPolicy = async () => {
  //   console.log("exec execFollowPolicy");
  //   const res = await execFollowPolicy({
  //     followPolicy: {
  //       type: FollowPolicyType.ANYONE,
  //     },
  //   });
  //   console.log(res);
  // };
  // useEffect(() => {
  //   if (session?.authenticated) setFollowPolicy();
  // }, [session]);

  return (
    <ApolloContextProvider>
      <Header isConnected={isConnected} session={session} />

      <main className="w-full flex items-center justify-center  min-h-screen flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl mb-5 font-semibold text-center">
            Welcome to social on lens
          </h1>

          {address ? (
            <>
              {!session?.authenticated && (
                <div className="w-fit flex flex-col p-8 rounded-lg border bg-gray-300/10 border-gray-300 gap-3">
                  <LoginForm owner={address} />
                </div>
              )}
            </>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </main>
    </ApolloContextProvider>
  );
}
