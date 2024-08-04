import { Button } from "./Button";
import { signTypedData } from "@wagmi/core";
import { getSigner, wagmiConfig } from "./Web3Provider";
import {
  BROADCAST_TXN_MUTATION,
  FOLLOW_TYPED_DATA_MUTATION,
  SET_FOLLOW_MODULE_MUTATION,
  UNFOLLOW_TYPED_DATA_MUTATION,
} from "@/app/mutations";
import { useMutation } from "@apollo/client";
import {
  FollowPolicyType,
  Profile,
  resolveFollowPolicy,
  useFollow,
  useUpdateFollowPolicy,
} from "@lens-protocol/react-web";

export function FollowButton({ profile }: { profile: Profile }) {
  const [follow] = useMutation(FOLLOW_TYPED_DATA_MUTATION);
  const [unfollow] = useMutation(UNFOLLOW_TYPED_DATA_MUTATION);
  const [setFollow] = useMutation(SET_FOLLOW_MODULE_MUTATION);
  const [broadcastTxn, { loading }] = useMutation(BROADCAST_TXN_MUTATION);

  const { execute: execFollow } = useFollow();
  console.log(profile);
  const followPolicy = resolveFollowPolicy(profile);

  const signAction = async ({ id, domain, types, value }) => {
    const signer = await getSigner();
    const signature = await signer._signTypedData(domain, types, value);
    console.log("signedTypedData", signature);

    const res = await broadcastTxn({ variables: { id, signature } });
    console.log("res", res);
  };

  const handleFollow = async () => {
    // const { data } = await follow({
    //   variables: { profileId: profile.id },
    // });
    // const { domain, types, value } = data.createFollowTypedData.typedData;
    // console.log("createFollowTypedData", data.createFollowTypedData, {
    //   domain,
    //   types,
    //   value,
    // });

    // signAction({ id: data.createFollowTypedData.id, domain, types, value });

    const result = await execFollow({ profile });
    console.log(result);
  };

  const handleUnFollow = async () => {
    const { data } = await unfollow({
      variables: { profileId: profile.id },
    });
    const { domain, types, value } = data.createUnfollowTypedData.typedData;
    console.log("createUnfollowTypedData", data.createUnfollowTypedData, {
      domain,
      types,
      value,
    });

    signAction({ id: data.createUnfollowTypedData.id, domain, types, value });
  };

  if (followPolicy.type != FollowPolicyType.ANYONE) {
    return <p>Cannot follow this profile</p>;
  }

  console.log(profile.operations.canFollow);

  return (
    <Button
      disabled={loading}
      onClick={() =>
        profile.operations.isFollowedByMe.value
          ? handleUnFollow()
          : handleFollow()
      }
      color={profile.operations.isFollowedByMe.value ? "success" : "primary"}
    >
      {profile.operations.isFollowedByMe.value ? "Unfollow" : "Follow"}
    </Button>
  );
}
