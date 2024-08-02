import { ConnectKitButton } from "connectkit";
import { Button } from "./Button";

export function ConnectWalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress }) => {
        return <Button onClick={show}>Login</Button>;
      }}
    </ConnectKitButton.Custom>
  );
}
