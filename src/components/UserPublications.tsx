import { PublicationsListItem } from "./PublicationsListItem";
import { useQuery } from "@apollo/client";
import { USER_PUBLICATIONS_QUERY } from "@/app/queries";

export function UserPublications({ id }) {
  const { data, loading, error } = useQuery(USER_PUBLICATIONS_QUERY, {
    variables: { id },
  });
  const publications = data?.publications;

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  if (!publications?.items) return <p>There no publications</p>;

  return (
    <div className="flex flex-col w-1/2 gap-3">
      <b>All Publications ({publications.items.length})</b>
      {publications.items.map((item) => (
        <PublicationsListItem item={item} />
      ))}
    </div>
  );
}
