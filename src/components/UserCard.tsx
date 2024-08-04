"use client";

import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { Profile, ProfileFields } from "@lens-protocol/react-web";
import { FollowButton } from "./FollowButton";

export function UserCard({ profile }: { profile: Profile }) {
  const { push } = useRouter();

  return (
    <div className="border rounded h-32 border-gray-300 p-2 px-3 flex flex-col gap-2 justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-xl">{profile?.handle?.localName}</span>
        <span className="text-gray-500 text-xs truncate">
          @{profile.handle?.fullHandle}
        </span>
      </div>
      <div className="flex gap-2 w-full">
        <FollowButton profile={profile} />
        <Button color="secondary" onClick={() => push(`/${profile.id}`)}>
          Visit
        </Button>
      </div>
    </div>
  );
}
