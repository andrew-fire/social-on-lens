"use client";

import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { Profile, useSession } from "@lens-protocol/react-web";
import { FollowButton } from "./FollowButton";

const DEFAULT_USER_IMAGE =
  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";

export function UserCard({ profile }: { profile: Profile }) {
  const { push } = useRouter();
  const { data: session } = useSession();

  return (
    <div className="border rounded h-32 border-gray-300 p-2 px-3 flex flex-col gap-2 justify-between">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10">
          <img
            src={profile.metadata?.picture?.raw?.uri ?? DEFAULT_USER_IMAGE}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DEFAULT_USER_IMAGE;
            }}
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xl">{profile?.handle?.localName}</span>
          <span className="text-gray-500 text-xs truncate">
            @{profile.handle?.fullHandle}
          </span>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        {session?.authenticated && <FollowButton profile={profile} />}
        <Button color="secondary" onClick={() => push(`/${profile.id}`)}>
          Visit
        </Button>
      </div>
    </div>
  );
}
