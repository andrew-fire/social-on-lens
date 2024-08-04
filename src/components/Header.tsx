import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { Session } from "@lens-protocol/react-web";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_ID_QUERY, PROFILE_QUERY } from "@/app/queries";

export function Header({
  isConnected,
  session,
}: {
  isConnected: boolean;
  session?: Session;
  }) {
  const { data, loading, error } = useQuery(GET_PROFILE_ID_QUERY, {
    variables: { address: session?.address },
  });

  return (
    <div className="w-full flex items-center justify-between gap-3 border-b-gray-300 border-b sticky top-0 bg-gray-100 p-4">
      <h1 className="font-bold uppercase">Social on Lens</h1>
      <div className="flex gap-10 items-center">
        <Link href={`/explore`}>Explore</Link>
        {!loading && session?.authenticated && (
          <>
            <Link href={`/${data.defaultProfile?.id}`}>My Profile</Link>
            <div className="flex items-center gap-2">
              {truncateEthAddress(session?.address)}
              <LogoutButton />
            </div>
          </>
        )}
        {isConnected ? <LogoutButton /> : <ConnectWalletButton />}
      </div>
    </div>
  );
}
