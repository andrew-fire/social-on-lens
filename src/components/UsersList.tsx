"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { EXPLORE_PROFILE_QUERY } from "@/app/queries";
import { UserCard } from "./UserCard";
import {
  ExploreProfilesOrderByType,
  Profile,
  useExploreProfiles,
} from "@lens-protocol/react-web";
import { Loading } from "./Loading";

export function UsersList() {
  // const { data, loading, error } = useQuery(EXPLORE_PROFILE_QUERY);
  // const profiles = data?.exploreProfiles;
  const { data, error, loading } = useExploreProfiles({
    orderBy: ExploreProfilesOrderByType.MostFollowers,
  });
  const profiles = { items: data };

  console.log(profiles);

  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;
  if (!profiles?.items) return <p>There no profiles</p>;

  return (
    <div className="flex flex-col w-1/4 gap-2">
      <b>User profiles</b>
      {profiles.items.map((profile: Profile, i: number) => (
        <>{profile && <UserCard key={i} profile={profile} />}</>
      ))}
    </div>
  );
}
