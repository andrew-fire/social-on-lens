import { Session, useSetProfileMetadata } from "@lens-protocol/react-web";
import { Button } from "./Button";

export function UpdateMyProfile({
  metadataURI,
  session,
}: {
  metadataURI: string;
  session?: Session;
}) {
  const { execute, loading } = useSetProfileMetadata();

  const update = async () => {
    if (!session?.authenticated) return;

    const result = await execute({ metadataURI });

    // detect if an early error occurred
    if (result.isFailure()) {
      window.alert(result.error.message);
      return;
    }

    // optional: wait for the transaction to be mined and indexed
    const completion = await result.value.waitForCompletion();

    // detect if a minining/indexing error occurred
    if (completion.isFailure()) {
      window.alert(completion.error.message);
      return;
    }

    // success!
    window.alert("Profile Metadata updated!");
  };

  return (
    <Button onClick={update} disabled={loading}>
      Update profile
    </Button>
  );
}
