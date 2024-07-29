import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { DisconnectWalletButton } from "./DisconnectWalletButton";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { Session } from "@lens-protocol/react-web";
import Link from "next/link";

export function Header({
  isConnected,
  address,
  session,
}: {
  isConnected: boolean;
  address?: string;
  session?: Session;
}) {
  return (
    <div className="w-full flex items-center justify-between gap-3 bg-gray-100 rounded-xl p-4">
      <h1 className="font-bold uppercase">Social on Lens</h1>
      <div className="flex gap-10 items-center">
        {session?.authenticated && <Link href={`/${address}`}>My Profile</Link>}
        {isConnected ? (
          <div className="flex items-center gap-2">
            {truncateEthAddress(address)}
            <DisconnectWalletButton />
          </div>
        ) : (
          <ConnectWalletButton />
        )}
      </div>
    </div>
  );
}
