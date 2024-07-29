import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query DefaultProfile($address: EvmAddress!) {
    defaultProfile(request: { for: $address }) {
      stats {
        followers
        following
      }
      metadata {
        displayName
      }
    }
  }
`;