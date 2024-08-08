"use client";

import React, { useEffect, useState } from "react";
import { PROFILE_QUERY } from "@/app/queries";
import { useQuery } from "@apollo/client";
import { Session, SessionType } from "@lens-protocol/react-web";
import { Composer } from "./Composer";
import { UserPublications } from "./UserPublications";
import { Button } from "./Button";
import { Loading } from "./Loading";
import { FollowButton } from "./FollowButton";

export function Profile({
  id,
  session,
}: {
  id: string | string[];
  session?: Session;
}) {
  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    variables: { request: { forProfileId: id } },
  });

  const profile = data?.profile;

  if (loading) return <Loading />;
  if (error) return <pre>{error.message}</pre>;
  if (!profile)
    return (
      <p>
        There no profile <b>{id}</b>
      </p>
    );

  const isAuthenticated =
    session?.authenticated && session.type === SessionType.WithProfile;
  const isCurrentUser = isAuthenticated
    ? profile.ownedBy.address === session.address
    : false;

  return (
    <div className="flex flex-col gap-10 w-1/2">
      <h1 className="text-4xl font-semibold">
        <div className="flex items-start justify-between ">
          <div className="w-full">
            {profile.metadata?.displayName ? (
              <>
                <b>{profile.metadata?.displayName}</b>
                <p className="text-gray-500 text-base">
                  @{profile.handle.fullHandle}
                </p>
              </>
            ) : (
              <b>{profile.handle.fullHandle}</b>
            )}
          </div>
          {isAuthenticated && !isCurrentUser && (
            <div className="flex gap-2">
              <div className="w-32">
                <FollowButton profile={profile} />
              </div>
              <div className="w-32">
                <Button color="danger">Block</Button>
              </div>
            </div>
          )}
        </div>
      </h1>

      <div className="flex w-fit bg-gray-100 rounded-lg p-5 gap-5 items-center justify-between">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="uppercase text-xs">Followers</h1>
          <b className="text-2xl">{profile.stats.followers}</b>
        </div>
        <div className="w-[1px] py-6 bg-gray-300" />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="uppercase text-xs">Followings</h1>
          <b className="text-2xl">{profile.stats.following}</b>
        </div>
        <div className="w-[1px] py-6 bg-gray-300" />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="uppercase text-xs">Publications</h1>
          <b className="text-2xl">{profile.stats.publications}</b>
        </div>
      </div>

      {isAuthenticated && isCurrentUser && (
        <div className="flex flex-col gap-3">
          <b>Create a post</b>
          <Composer />
        </div>
      )}

      <UserPublications id={profile.id} />
    </div>
  );
}
