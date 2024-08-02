"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import { FOLLOW_MUTATION, UNFOLLOW_MUTATION } from "@/app/mutations";
import { ProfileFields } from "@lens-protocol/react-web";

export function UserCard({ profile }: { profile: ProfileFields }) {
  const { push } = useRouter();
  const [follow, { loading: following, error: followErrors }] =
    useMutation(FOLLOW_MUTATION);
  const [unfollow, { loading: unfollowing, error: unfollowErrors }] =
    useMutation(UNFOLLOW_MUTATION);

  const handleFollow = async (id: String) => {
    await follow({ variables: { profileId: id } });
  };

  const handleUnFollow = async (id: String) => {
    await unfollow({ variables: { profileId: id } });
  };

  return (
    <div className="border rounded h-64 w-56 border-gray-300 p-2 px-3 flex flex-col gap-2 justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-xl">{profile?.handle?.localName}</span>
        <span className="text-gray-500 text-xs truncate">
          @{profile?.handle?.fullHandle}
        </span>
      </div>
      <div className="flex gap-2 w-full">
        {profile.signless && (
          <Button
            disabled={following || unfollowing}
            onClick={() =>
              profile.operations.isFollowedByMe.value
                ? handleUnFollow(profile.id)
                : handleFollow(profile.id)
            }
            color={
              profile.operations.isFollowedByMe.value ? "success" : "primary"
            }
          >
            {profile.operations.isFollowedByMe.value ? "Unfollow" : "Follow"}
          </Button>
        )}
        <Button
          color="secondary"
          onClick={() => push(`/${profile.ownedBy.address}`)}
        >
          Visit
        </Button>
      </div>
    </div>
  );
}
