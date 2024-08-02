import { useFeed, profileId } from "@lens-protocol/react";
import { PublicationType, usePublications } from "@lens-protocol/react-web";

export function MyPublications({ id }) {
  const { data, loading, error } = usePublications({
    where: {
      publicationTypes: [PublicationType.Post],
      from: [profileId(id)],
    },
    suspense: true,
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(({ id, metadata }) => (
        <li key={`${id}`}>{metadata.content}</li>
      ))}
    </ul>
  );
}
