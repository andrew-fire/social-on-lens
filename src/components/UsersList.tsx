"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { EXPLORE_PROFILE_QUERY } from "@/app/queries";
import { UserCard } from "./UserCard";
import { ProfileFields } from "@lens-protocol/react-web";

export function UsersList() {
  const { data, loading, error } = useQuery(EXPLORE_PROFILE_QUERY);
  const profiles = data?.exploreProfiles;

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  if (!profiles?.items) return <p>There no profiles</p>;

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {profiles.items.map((profile: ProfileFields, i: number) => (
        <UserCard key={i} profile={profile} />
      ))}
    </div>
  );
}
