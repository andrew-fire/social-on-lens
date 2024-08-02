import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query DefaultProfile($address: EvmAddress!) {
    defaultProfile(request: { for: $address }) {
      id
      signless
      stats {
        followers
        following
      }
      handle {
        fullHandle
      }
      operations {
        isFollowedByMe {
          value
          isFinalisedOnchain
        }
      }
      metadata {
        displayName
        picture {
          ... on ImageSet {
            raw {
              uri
            }
          }
        }
      }
    }
  }
`;

export const EXPLORE_PROFILE_QUERY = gql`
  query ExploreProfiles {
    exploreProfiles(request: { orderBy: LATEST_CREATED }) {
      items {
        id
        signless
        handle {
          fullHandle
        }
        ownedBy {
          address
        }
        stats {
          id
          followers
          following
        }
        operations {
          isFollowedByMe {
            value
            isFinalisedOnchain
          }
        }
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;