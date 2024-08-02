"use client";

import React, { useEffect, useState } from "react";
import { PROFILE_QUERY } from "@/app/queries";
import { useQuery } from "@apollo/client";
import { Session, SessionType } from "@lens-protocol/react-web";
import { Composer } from "./Composer";
import { MyPublications } from "./MyPublications";

export function Profile({
  address,
  session,
}: {
  address: string | string[];
  session?: Session;
}) {
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
        {profile?.metadata?.displayName ?? `@${profile?.handle.fullHandle}`}
      </h1>

      {session?.authenticated && session.type === SessionType.WithProfile && (
        <div className="w-32">
          <p>Create a post</p>
          <Composer />
        </div>
      )}

      <MyPublications id={profile.id} />

      <div className="flex w-fit gap-5 items-center justify-between">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="uppercase text-sm">Followers</h1>
          <b>{profile?.stats.followers}</b>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="uppercase text-sm">Followings</h1>
          <b>{profile?.stats.following}</b>
        </div>
      </div>
    </div>
  );
}
