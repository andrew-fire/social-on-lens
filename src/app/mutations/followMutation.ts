import { gql } from "@apollo/client";

export const FOLLOW_MUTATION = gql`
  mutation FollowMutation($profileId: ProfileId!) {
    createFollowTypedData(request: { follow: { profileId: $profileId } }) {
      id
    }
  }
`;

export const UNFOLLOW_MUTATION = gql`
  mutation UnFollowMutation($profileId: ProfileId!) {
    unfollow(request: { unfollow: { profileId: $profileId } }) {
      ... on RelaySuccess {
        txId
        txHash
      }
      ... on LensProfileManagerRelayError {
        reason
      }
    }
  }
`;
