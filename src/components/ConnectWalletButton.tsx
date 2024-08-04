import { ConnectKitButton } from "connectkit";
import { Button } from "./Button";

export function ConnectWalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <Button onClick={show} color="secondary">
            Connect your wallet
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
