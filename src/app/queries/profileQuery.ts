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

const postFragment = gql`
  fragment CommonPost on Post {
    id
    metadata {
      ... on ImageMetadataV3 {
        id
        content
        asset {
          image {
            optimized {
              uri
            }
          }
        }
      }
      ... on TextOnlyMetadataV3 {
        id
        content
      }
    }
    createdAt
    stats {
      comments
      reactions
    }
    by {
      ownedBy {
        address
      }
      handle {
        fullHandle
      }
    }
  }
`;

export const EXPLORE_PUBLICATIONS_QUERY = gql`
  ${postFragment}
  query ExplorePublications {
    explorePublications(
      request: { orderBy: TOP_REACTED, where: { publicationTypes: [POST] } }
    ) {
      items {
        ...CommonPost
      }
    }
  }
`;

export const USER_PUBLICATIONS_QUERY = gql`
  ${postFragment}
  query UserPublications($id: ProfileId!) {
    publications(
      request: { where: { publicationTypes: [POST], from: [$id] } }
    ) {
      items {
        ...CommonPost
      }
    }
  }
`;