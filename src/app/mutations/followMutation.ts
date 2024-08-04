import { gql } from "@apollo/client";

export const FOLLOW_TYPED_DATA_MUTATION = gql`
  mutation FollowMutation($profileId: ProfileId!) {
    createFollowTypedData(request: { follow: [{ profileId: $profileId }] }) {
      id
      typedData {
        types {
          Follow {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          followerProfileId
          idsOfProfilesToFollow
          followTokenIds
          datas
        }
      }
    }
  }
`;

export const SET_FOLLOW_MODULE_MUTATION = gql`
  mutation SetFollowModule($request: SetFollowModuleRequest!) {
    setFollowModule(request: $request) {
      ... on RelaySuccess {
        txHash
        txId
      }
      ... on LensProfileManagerRelayError {
        reason
      }
    }
  }
`;

export const UNFOLLOW_TYPED_DATA_MUTATION = gql`
  mutation UnFollowMutation($profileId: ProfileId!) {
    createUnfollowTypedData(request: { unfollow: [$profileId] }) {
      id
      typedData {
        types {
          Unfollow {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          unfollowerProfileId
          idsOfProfilesToUnfollow
        }
      }
    }
  }
`;

export const BROADCAST_TXN_MUTATION = gql`
  mutation BroadcastOnchain($id: BroadcastId, $signature: Signature) {
    broadcastOnchain(request: { id: $id, signature: $signature }) {
      ... on RelaySuccess {
        txHash
        txId
      }
      ... on RelayError {
        reason
      }
    }
  }
`;
