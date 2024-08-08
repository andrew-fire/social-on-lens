import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { Session, WalletOnlySession } from "@lens-protocol/react-web";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_ID_QUERY } from "@/app/queries";
import { LoginButton } from "./LoginButton";

export function Header({
  isConnected,
  session,
}: {
  isConnected: boolean;
  session?: Session;
}) {
  const { data, loading, error } = useQuery(GET_PROFILE_ID_QUERY, {
    variables: { address: session?.authenticated ? session.address : null },
  });

  return (
    <div className="w-full flex items-center justify-between gap-3 border-b-gray-300 border-b sticky top-0 bg-gray-100 p-4">
      <h1 className="w-full font-bold uppercase">Social on Lens</h1>
      <div className="w-full flex gap-10 items-center justify-end">
        <Link href={`/explore`}>Explore</Link>
        {!loading && session?.authenticated && (
          <>
            <Link href={`/${data.defaultProfile?.id}`}>My Profile</Link>
            <div className="flex items-center gap-2">
              {truncateEthAddress(session?.address)}
            </div>
          </>
        )}
        <div className="w-32">
          {isConnected && session?.authenticated ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
}
