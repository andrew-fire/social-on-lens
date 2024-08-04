import { textOnly, TextOnlyMetadata } from "@lens-protocol/metadata";
import { useCreatePost } from "@lens-protocol/react-web";
import { Button } from "./Button";
import { Loading } from "./Loading";

const IPFS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNjRkZGQ3Mi1jODEwLTQ3YmQtOGM1Mi01YjliMTc4ZGE1NmEiLCJlbWFpbCI6InNheWNodWsuYW5kcml5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiM2E4OTMyZTJhYzA1MDRmYTU5MSIsInNjb3BlZEtleVNlY3JldCI6ImQ4YjdjMjM4MTQwODFiYTAyOWM5Yzk0ZGZiZTA1MDRhNmJlMzkyYzQ2Nzg1OWRjMzc4ZmI3NWMzOWRiMWRjNjIiLCJpYXQiOjE3MjI1OTA3MDh9.BYXA0LAXHHlpfhRGCaYbMtqGzN29fWHexstLguqO-_4";
const IPFS_URL = "https://turquoise-general-wildcat-863.mypinata.cloud/ipfs/";

export function Composer() {
  const { execute, loading, error } = useCreatePost();

  const uploadJson = async (metadata: TextOnlyMetadata) => {
    const request = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${IPFS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      }
    );
    const response = await request.json();
    return IPFS_URL + response.IpfsHash;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // create post metadata
    const metadata = textOnly({
      content: formData.get("content") as string,
    });

    // publish post
    const result = await execute({
      metadata: await uploadJson(metadata),
    });

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

    // post was created
    const post = completion.value;
    window.alert(`Post ID: ${post.id}`);
  };

  return (
    <form onSubmit={submit} className="w-full flex flex-col gap-3 items-end">
      <textarea
        className="border p-3 rounded-lg w-full"
        name="content"
        minLength={1}
        required
        rows={3}
        placeholder="What's happening?"
        disabled={loading}
      ></textarea>

      <div className="w-fit">
        <Button type="submit" color="success" disabled={loading}>
          {loading ? <Loading /> : "Post"}
        </Button>
      </div>

      {!loading && error && <p>{error.message}</p>}
    </form>
  );
}
