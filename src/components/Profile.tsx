import React from "react";
import { useQuery } from "@apollo/client";
import { PROFILE_QUERY } from "@/app/queries";

export function Profile({ address }: { address: string }) {
  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    variables: { address },
  });
  const profile = data?.defaultProfile;

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  if (!profile)
    return <p>There no profile associated with address: {address}</p>;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-semibold">
        {profile?.metadata.displayName}
      </h1>
      <div className="flex w-fit gap-5 items-center justify-between">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="uppercase text-sm">My Followers</h1>
          <b>{profile?.stats.followers}</b>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="uppercase text-sm">My Followings</h1>
          <b>{profile?.stats.following}</b>
        </div>
      </div>
    </div>
  );
}
